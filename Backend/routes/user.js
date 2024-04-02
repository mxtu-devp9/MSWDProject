const express = require('express');
const router = express.Router();
const User = require('../model/user');


router.post('/signup', async (req, res) => {
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


module.exports = router;
