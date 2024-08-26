const jwt = require('jsonwebtoken');
const { successRespHelper, failRespHelper } = require('../helper/respHelper');

const checklogin = (req, res, next) => {
    const token = req.cookies.Token;
    if (!token) {
        return res.redirect('/login');
    }
    try {
        const decoded = jwt.verify(token, 'tin123');
        req.user = decoded; 
        next();
    } catch (error) {
        return res.redirect('/login');
    }
};

module.exports = checklogin;
