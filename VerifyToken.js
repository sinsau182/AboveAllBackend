const jwt = require('jsonwebtoken');
const { createError } = require('./error');


const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (!token) return next(createError(401, 'Access Denied'));

    jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) return next(createError(403, 'Invalid Token'));
            req.user = user;
            next();
        });
}

module.exports = verifyToken;