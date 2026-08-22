import AppError from "../errors/AppError.js";
import { createShortUrlServiceWithoutUserId, createShortUrlServiceWithUserId, createCustomShortUrlServiceWithUserId } from "../services/shorturl.services.js"
import urlSchema from "../models/shorturl.model.js";

const isValidHttpUrl = (url) => {
    try {
        const parsed = new URL(url);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
};

// ponytail: charset guard only — full reserved-word collision handling if aliases ever clash with frontend routes
const isValidAlias = (alias) => /^[A-Za-z0-9_-]{3,30}$/.test(alias);

export const createShortUrl = async (req, res) => {
    const { url, customShortUrl } = req.body;

    if (!isValidHttpUrl(url)) {
        throw new AppError("URL must be a valid http(s) URL", 400);
    }

    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
        throw new AppError("URL cannot be empty or whitespace", 400);
    }

    if (!process.env.APP_URL) {
        throw new AppError("APP_URL environment variable is not configured", 500);
    }

    if (customShortUrl) {
        if (!isValidAlias(customShortUrl)) {
            return res.status(400).json({
                success: false,
                message: "Custom alias must be 3-30 characters (letters, numbers, - or _)"
            });
        }
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided"
            });
        }
        const shortUrl = await createCustomShortUrlServiceWithUserId(trimmedUrl, customShortUrl, req.user.id);
        res.status(201).json({
            success: true,
            shortUrl: `${process.env.APP_URL}/${shortUrl}`,
        });
    } else {
        const shortUrl = await createShortUrlServiceWithoutUserId(trimmedUrl);
        res.status(201).json({
            success: true,
            shortUrl: `${process.env.APP_URL}/${shortUrl}`,
        });
    }
}

export const redirectToFullUrl = async (req, res) => {
    const { id } = req.params;
    const urlRecord = await urlSchema.findOne({ short_url: id });

    if (!urlRecord) {
        throw new AppError("URL not found", 404);
    }

    if (!urlRecord.full_url || typeof urlRecord.full_url !== 'string' || !isValidHttpUrl(urlRecord.full_url)) {
        throw new AppError("Corrupted URL record: invalid full_url", 500);
    }

    urlRecord.clicks++;
    await urlRecord.save();
    return res.redirect(urlRecord.full_url);
}