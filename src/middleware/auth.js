const jsonwebtoken = require('jsonwebtoken');
const db = require('../models/index.js');
const User = db.user

const ensureAuthenticated = async (req, res, next) => {

    if (req.path.includes('/auth')) {

        return next();

    }

    if (!req.headers.authorization) {

        return res.status(403).json({ message: 'You are not authenticated' });
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {

        return res.status(403).json({ message: 'Invalid token' });

    }

    const payload = jsonwebtoken.decode(token, process.env.TOKEN_SECRET);

    if (!payload || !payload.email) {

        return res.status(403).json({ message: 'Invalid token' });
    }

    const user = await User.findOne({ where: { email: payload.email } });

    if (!user) {

        return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user

    return next();

}


module.exports = ensureAuthenticated

