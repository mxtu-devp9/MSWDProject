const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()
const User = require('./model/user')
const Fund = require('./model/fund')
const Transaction = require('./model/transaction')


require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }))

const PORT = process.env.PORT;

connectToDB();

app.get('/', () => {
    res.send('I am root');
})

app.get('/funds', async (req, res) => {
    const funds = await Fund.find();
    res.json(funds);
})


app.post('/funds/:id', async (req, res) => {
    try {
        id = req.params.id;
        if (!User.findById(id)) {
            res.send("User not found");
        }
        const fund = new Fund({
            fund_name: req.body.fund_name,
            fund_description: req.body.fund_description,
            fund_goal: req.body.fund_goal,
            fund_current: 0,
            fund_start: Date.now(),
            fund_creator: id,
            fund_category: req.body.fund_category,
        });
        await fund.save()
        res.json(fund)
        // res.send("fund created successfuly")
    } catch (err) {
        console.log(err);
    }
});

app.post('/users', async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        await user.save();
        res.json(user);
    } catch (err) {
        console.log(err);
    }
});

app.get('/funds/:id', (req, res) => {
    const fund = Fund.findById(req.params.id);
    res.json(fund);
})

app.put('/funds/:id', async (req,res) => {
    try {
        const fund = await Fund.findById(req.params.id);
        fund.fund_name = req.body.fund_name;
        fund.fund_description = req.body.fund_description;
        fund.fund_goal = req.body.fund_goal;
        fund.fund_current = req.body.fund_current;
        fund.fund_start = req.body.fund_start;
        fund.fund_end = req.body.fund_end;
        fund.fund_creator = req.body.fund_creator;
        fund.fund_category = req.body.fund_category;
        fund.fund_image = req.body.fund_image;
        await fund.save();
        res.json(fund);
    } catch (err) {
        console.log(err);
    }
})

app.delete('/funds/:id', async (req, res) => {
    try {
        const fund = await Fund.findByIdAndDelete(req.params.id);
        res.json(fund);
    } catch (err) {
        console.log(err);
    }
})

app.post('/transactions/:uid/:fid', async (req, res) => {
    try {
        uid = req.params.uid;
        fid = req.params.fid;
        if (!User.findById(uid)) {
            res.send("User not found");
        }
        if (!Fund.findById(fid)) {
            res.send("Fund not found");
        }
        const transaction = new Transaction({
            transaction_amount: req.body.transaction_amount,
            transaction_date: Date.now(),
            transaction_user: uid,
            transaction_fund: fid,
        });
        await Fund.findById(fid).then((fund) => {
            fund.fund_current += req.body.transaction_amount;
            fund.save();
        });
        await transaction.save();
        res.json(transaction);
    } catch (err) {
        console.log(err);
    }
});



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


