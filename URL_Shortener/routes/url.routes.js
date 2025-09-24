import express from "express";
import { shortenPostRequestBodySchema } from "../validations/req.validation.js";
import db from "../db/index.js"
import {urlTable} from "../models/index.js"
import {nanoid} from "nanoid"
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import { insertShortUrl } from "../services/url.service.js";

const router = express.Router();

// all routes and paths

router.post("/shorten",ensureAuthenticated, async (req, res) => {
    

    const validationResult = await shortenPostRequestBodySchema.safeParseAsync(req.body);

    if(validationResult.error){
        return res.status(400).json({
            error : validationResult.error
        })
    }

    const {url , code} = validationResult.data;
    const shortCode = code ?? nanoid(6)

    const result = await insertShortUrl(req.user?.id, url, shortCode);


    return res.status(201).json({
        id : result.id,
        shortCode: result.shortCode,
        targetUrl: result.targetUrl,
    })


});

export default router;

