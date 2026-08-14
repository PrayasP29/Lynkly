import {generateID} from "../utils/helper.js";
import { saveShortUrl, findShortUrlBySlug } from "../dao/shorturl.js";
import AppError from "../errors/AppError.js";

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

export const createCustomShortUrlServiceWithUserId = async(url, customShortUrl, userId) => { 
    if (!customShortUrl || typeof customShortUrl !== 'string') {
        throw new AppError("Custom short URL must be a non-empty string", 400);
    }
    const existing = await findShortUrlBySlug(customShortUrl);
    if (existing) {
        throw new AppError("Custom short URL already taken", 400);
    }
    await saveShortUrl(url, customShortUrl, userId)
    return customShortUrl
}