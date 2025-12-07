const e = require("express");

const ensureAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).json({error: `You are not logged in`});
    };

module.exports = {
    ensureAuthenticated
}