// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function authenticate(req, res, next) {
    const tokenString = req.headers["authorization"];

    if (!tokenString) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = tokenString.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Unauthorized or invalid token" });
        }

        req.user = decoded; // attach decoded payload
        next();
    });
}
