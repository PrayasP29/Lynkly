import {generateID} from "../utils/helper.js";
import urlSchema from "../models/shorturl.model.js";

export const createShortUrlService = async(url) => { 
    const ShortUrl = await generateID(6)
    const newUrl = new urlSchema({
        full_url: url,
        short_url: ShortUrl,
        clicks: 0,
    })
    newUrl.save()
    return ShortUrl
}