import express from "express";
import {createShortUrl,createCustomShortUrl} from "../controller/shorturl.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/",createShortUrl);
router.post("/",authMiddleware,createCustomShortUrl);
export default router;