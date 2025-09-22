// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function authenticate(req, res, next) {
    let token = null;
    
    // Check for token in Authorization header
    const tokenString = req.headers["authorization"];
    if (tokenString) {
        token = tokenString.replace("Bearer ", "");
    }
    
    // Also check for token in query params (for downloads)
    if (!token && req.query.token) {
        token = req.query.token;
    }

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Unauthorized or invalid token" });
        }

        req.user = decoded; // attach decoded payload
        next();
    });
}
