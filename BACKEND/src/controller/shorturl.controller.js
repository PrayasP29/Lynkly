import { createShortUrlService } from "../services/shorturl.services.js"
export const createShortUrl = async (req, res) => {
    console.log("Body:", req.body)
    const {url}= req.body
    const ShortUrl = await createShortUrlService(url)
    res.send(process.env.APP_URL + "/" + ShortUrl)
}