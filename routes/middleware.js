const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json('Unauthorized');
    }

    jwt.verify(token, process.env.SECRET_KEY, {}, (err, info) => {
        if (err) {
            console.error(err);
            return res.status(401).json('Unauthorized');

        }
        req.user = info;
        next();
    });
};

module.exports = verifyToken;