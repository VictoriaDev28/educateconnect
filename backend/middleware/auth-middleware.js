const jwt = require('jsonwebtoken')


const verifyToken = (token, secret) => {
    return jwt.verify(token, secret)
}

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;


    if (!authHeader){
        return res.status(401).json({
            success : false,
            message : 'User is not authenticated'
        });
    }

    const token = authHeader.split(' ')[1];

    const jwtSecret = process.env.JWT_SECRET || 'changeme'
    let payload;
    try {
        payload = verifyToken(token, jwtSecret)
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' })
    }

    req.user = payload

    next()

    
}

module.exports = authenticate