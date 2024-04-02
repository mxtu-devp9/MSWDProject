
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        return res.redirect('/login');
    }
    next();
}

module.exports.isCreator = async (req, res, next) => {
    const fund = await Fund.findById(req.params.id);
    if (!fund.fund_creator.equals(req.user._id)) {
        res.send("You are not authorized to update this fund");
        return
    }
    next();
}
