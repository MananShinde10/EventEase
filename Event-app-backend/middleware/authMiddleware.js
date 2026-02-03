const jwt = require("jsonwebtoken");
require("dotenv").config();

/* 🔐 Verify JWT token */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { uid, role }
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

/* 👮 Single role check */
const verifyRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};

/* 👮 Multiple roles check */
const verifyRoleMultiple = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};

module.exports = {
    verifyToken,
    verifyRole,
    verifyRoleMultiple
};
