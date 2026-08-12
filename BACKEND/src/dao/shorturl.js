import urlSchema from "../models/shorturl.model.js";

export const saveShortUrl = async(url, shortUrl, userId = null) => {
    if (typeof url !== 'string') {
        throw new Error(`Invalid URL type: expected string, got ${typeof url}. Value: ${JSON.stringify(url)}`);
    }
    if (typeof shortUrl !== 'string') {
        throw new Error(`Invalid shortUrl type: expected string, got ${typeof shortUrl}`);
    }

    const urlData = {
        full_url: url,
        short_url: shortUrl,
        clicks: 0,
    };

    if(userId) {
        urlData.user_id = userId;
    }

    const newUrl = new urlSchema(urlData);
    await newUrl.save();
}