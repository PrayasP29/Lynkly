import express from "express";
import { createShortUrl } from "../controller/shorturl.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", authMiddleware, createShortUrl);
export default router;