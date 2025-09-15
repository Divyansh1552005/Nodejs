
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

import jwt from "jsonwebtoken"


export const authMiddleware = async function(req, res, next) {
    try {
        // Correct way to read the Authorization header
        const tokenHeader = req.headers['authorization'] || req.headers['Authorization'];

        // If no header, continue without setting req.user (routes can protect using ensureAuthenticated)
        if (!tokenHeader) return next();

        if (!tokenHeader.startsWith('Bearer ')) {
            return res.status(400).json({ error: 'Auth header must begin with "Bearer "' });
        }

        const token = tokenHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        return next();
    } catch (error) {
        // If token verification fails, clear user and continue (or you could return 401)
        req.user = null;
        return next();
    }
};

export const ensureAuthenticated = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'You must be logged in to access this!' });
    }

    next();
};