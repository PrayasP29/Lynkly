import urlSchema from "../models/shorturl.model.js";
export const saveShortUrlService = async(url, shortUrl, userId) => {
    const newUrl = new urlSchema({
        full_url: url,
        short_url: shortUrl,
        clicks: 0,
        user_id: userId,
    })

    if(userId){
        newUrl.user_id = userId;
    }
    await newUrl.save()
}