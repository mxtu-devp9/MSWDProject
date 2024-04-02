const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()
const User = require('./model/user')
const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local')
const userRouter = require('./routes/user')
const fundRouter = require('./routes/fund')


require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }))

const PORT = process.env.PORT;

const sessionOptions = {
    secret: "supersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
    }
}

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

connectToDB();

app.get('/', () => {
    res.send('I am root');
})

app.use((req, res, next) => {
    res.locals.currUser = req.user;
    next();
})

app.use('/user', userRouter);
app.use('/funds', fundRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

async function connectToDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to DB');
    } catch (err) {
        console.log('Error connecting to DB');
    }
}


