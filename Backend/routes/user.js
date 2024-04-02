const express = require('express');
const router = express.Router();
const User = require('../model/user');
const passport = require('passport');


// router.post('/signup', async (req, res) => {
//     try {
//         const user = new User({
//             username: req.body.username,
//             password: req.body.password,
//             email: req.body.email
//         });
//         await user.save();
//         res.json(user);
//     } catch (err) {
//         console.log(err);
//     }
// });



router.post('/signup', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.send('User registered');
        });
    } catch (e) {
        console.log(e);
        res.redirect('/signup');
    }
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
}), (req, res) => {
    res.send('User logged in');
});


module.exports = router;
