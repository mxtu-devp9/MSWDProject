const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()
const User = require('./model/user')
const Fund = require('./model/fund')
const Transaction = require('./model/transaction')
const userRouter = require('./routes/user')
const fundRouter = require('./routes/fund')


require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }))

const PORT = process.env.PORT;

connectToDB();

app.get('/', () => {
    res.send('I am root');
})

app.use('/users', userRouter);
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


