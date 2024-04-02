const express = require('express');
const router = express.Router();
const Fund = require('../model/fund');
const User = require('../model/user');
const { isLoggedIn,isCreator } = require('../middleware');


router.get('/', async (req, res) => {
    const funds = await Fund.find();
    res.json(funds);
})


router.post('/:id', isLoggedIn, async (req, res) => {
    try {
        const currUser = req.user;
        const id = currUser._id;
        if (!currUser) {
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
        res.send("fund created successfuly")
    } catch (err) {
        console.log(err);
    }
});

router.get('/:id', (req, res) => {
    const fund = Fund.findById(req.params.id);
    res.json(fund);
})

router.put('/:id', isLoggedIn,isCreator, async (req, res) => {
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
        res.send("fund updated successfully");
    } catch (err) {
        console.log(err);
    }
})

router.delete('/:id',isLoggedIn,isCreator, async (req, res) => {
    try {
        await Fund.findByIdAndDelete(req.params.id);
        res.send("fund deleted successfully");
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
