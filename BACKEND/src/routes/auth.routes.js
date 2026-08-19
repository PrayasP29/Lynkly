import express from "express";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../controller/auth.controller.js";
import { validateRegisterInput, validateLoginInput } from "../utils/validation.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", validateRegisterInput, registerUser);
router.post("/login", validateLoginInput, loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/me", authMiddleware, getCurrentUser);

export default router;