    const jwt = require('jsonwebtoken');
    const cookieParser = require('cookie-parser');

    const auth = (req, res, next) => {
    //   const authHeader = req.headers.authorization;

    //   if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     return res.status(401).json({ message: 'No token provided' });
    //   }

    const token = req.cookies.token;
    console.log("Token from cookies:", token);
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // use the same secret used during login/signup
    console.log("Decoded token:", decoded);

        req.user = decoded; // attaches user data (id, email etc) to the request
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    };

    module.exports = auth;
