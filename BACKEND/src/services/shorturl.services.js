import {generateID} from "../utils/helper.js";
import urlSchema from "../models/shorturl.model.js";
import { saveShortUrlService } from "../dao/shorturl.js";

export const createShortUrlServiceWithoutUserId = async(url) => { 
    const ShortUrl = await generateID(6)
    if(!ShortUrl){
        throw new Error("Failed to generate short URL");
    }
    await saveShortUrlService(url, ShortUrl)
    return ShortUrl
}

export const createShortUrlServiceWithUserId = async(url, userId) => { 
    const ShortUrl = await generateID(6)
    await saveShortUrlService(url, ShortUrl,userId)
    return ShortUrl
}