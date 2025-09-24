import db from "../db/index.js";
import { urlTable } from "../models/url.model.js";



export async function insertShortUrl(userId, url, shortCode){

    const [result] = await db.insert(urlTable).values({
            shortCode: shortCode,
            targetUrl: url,
            userId: userId
    
        }).returning(); 

        return result;
}

    


