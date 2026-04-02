const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
           success: false,
            message: "Access denied. No token Provided"
        });
    }

    try {
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedtoken;

        next();
    } catch (error) {
        console.log("Error in auth-middleware -> ", error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

module.exports = authMiddleware