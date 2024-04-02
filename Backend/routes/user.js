const express = require('express');
const router = express.Router();


router.post('/users', async (req, res) => {
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
