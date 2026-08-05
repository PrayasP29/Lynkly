import AppError from "../errors/AppError.js";
import { createShortUrlServiceWithoutUserId } from "../services/shorturl.services.js"
import urlSchema from "../models/shorturl.model.js";

export const createShortUrl = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        throw new AppError("URL is required", 400);
    }

    const shortUrl = await createShortUrlServiceWithoutUserId(url);
    res.status(201).json({
        success: true,
        shortUrl: `${process.env.APP_URL}/${shortUrl}`,
    });
}

export const redirectToFullUrl = async (req, res) => {
    const { id } = req.params;
    const url = await urlSchema.findOne({ short_url: id });

    if (url) {
        url.clicks++;
        await url.save();
        return res.redirect(url.full_url);
    }

    throw new AppError("URL not found", 404);
}