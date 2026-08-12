import {generateID} from "../utils/helper.js";
import { saveShortUrl } from "../dao/shorturl.js";

export const createShortUrlServiceWithoutUserId = async(url) => { 
    const ShortUrl = await generateID(6)
    if(!ShortUrl){
        throw new Error("Failed to generate short URL");
    }
    await saveShortUrl(url, ShortUrl, null)
    return ShortUrl
}

export const createShortUrlServiceWithUserId = async(url, userId) => { 
    const ShortUrl = await generateID(6)
    await saveShortUrl(url, ShortUrl, userId)
    return ShortUrl
}