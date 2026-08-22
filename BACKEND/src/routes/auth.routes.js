import express from "express";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../controller/auth.controller.js";
import { validateRegisterInput, validateLoginInput } from "../utils/validation.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { burstLimit, lockoutGuard } from "../utils/rateLimit.js";

const router = express.Router();

router.post("/register", burstLimit, validateRegisterInput, lockoutGuard, registerUser);
router.post("/login", burstLimit, validateLoginInput, lockoutGuard, loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/me", authMiddleware, getCurrentUser);

export default router;