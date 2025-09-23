/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */


import {validateUserToken} from "../utils/token.js"


export function authenticationMiddleware(req,res,next){
    const authHeader = req.header['authorization'];

    if(!authHeader) return next();

    if(!authHeader.startsWith("Bearer")) return res.status(400).json({
        error : "Auth Header must start with Bearer"
    })

    const [b, token] = authHeader.split(' ');

    const payload = validateUserToken(token);

    req.user = payload;
    next();
}