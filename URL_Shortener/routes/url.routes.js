import express from "express";
import { shortenPostRequestBodySchema, updatePatchRequestBodySchema } from "../validations/req.validation.js";
import db from "../db/index.js"
import {urlTable, usersTable} from "../models/index.js"
import {nanoid} from "nanoid"
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import { insertShortUrl } from "../services/url.service.js";
import { eq, and } from "drizzle-orm"

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

// user wanna see all the short codes he has made 
router.get("/urls", ensureAuthenticated, async (req,res)=>{
    const userid = req.user?.id;


    // do this in service also
    const urls = await db.select({
        id: urlTable.id,
        shortCode: urlTable.shortCode,
        targetUrl: urlTable.targetUrl,
        createdAt: urlTable.createdAt
    }).from(urlTable).where(eq(urlTable.userId , userid));

    if(!urls || urls.length === 0){
        return res.status(200).json({
            message : "No URLs created by you.",
            urls: []
        })
    }

    return res.status(200).json({
        count: urls.length,
        urls: urls
    })

})

// delete url by the user
router.delete("/:id", ensureAuthenticated, async function (req,res){
    // id toh kisi aur user k url ki bhi ho skti hai dusre user par so check first 
    const id = req.params.id;
    
    const deletion = await db.delete(urlTable).where(and(
        eq(urlTable.id, id),
        eq(urlTable.userId, req.user.id)
    )).returning({
        id: urlTable.id,
        shortCode: urlTable.shortCode
    });

    if(!deletion || deletion.length === 0){
        return res.status(404).json({
            error: "URL not found or you don't have permission to delete it"
        });
    }

    return res.status(200).json({
        message: "Short code deleted successfully!",
        deletedUrl: deletion[0]
    })
})


// router patch request to update a url whether it is the target or shortcode
router.patch("/update/:id", ensureAuthenticated, async function (req, res) {
    const id = req.params.id;

    const validationResult = await updatePatchRequestBodySchema.safeParseAsync(req.body);

    if (validationResult.error) {
        return res.status(400).json({
            error: validationResult.error
        });
    }

    const { url, code } = validationResult.data;

    // build dynamic update object
    const updateData = {};
    if (url !== undefined) updateData.targetUrl = url;
    if (code !== undefined) updateData.shortCode = code;

    if (Object.keys(updateData).length === 0){
        return res.status(400).json({
            error: "No fields provided to update"
        });
    }

    // move to service layer later
    const updated = await db.update(urlTable)
        .set(updateData)
        .where(and(
            eq(urlTable.id, id),
            eq(urlTable.userId, req.user.id)
        ))
        .returning({
            id: urlTable.id,
            shortCode: urlTable.shortCode,
            targetUrl: urlTable.targetUrl,
            updatedAt: urlTable.updatedAt
        });

    if (!updated || updated.length === 0) {
        return res.status(404).json({
            error: "URL not found or you don't have permission to update it"
        });
    }

    return res.status(200).json({
        message: "URL updated successfully!",
        updatedUrl: updated[0]
    });
});


// done to redirect to the original url and ofc it should not be authenticated
router.get("/:shortCode", async function (req,res){
    const code = req.params.shortCode;

    // todo : later write the below db operation part in service
    const [result] = await db.select({
        targetUrl: urlTable.targetUrl
    }).from(urlTable).where(eq(urlTable.shortCode, code));

    if(!result){
        return res.status(404).json({
            error: "Invalid URL"
        })
    }

    return res.redirect(result.targetUrl);


})

export default router;

