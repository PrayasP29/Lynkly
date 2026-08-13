import express from "express";
import { registerUser, loginUser } from "../controller/auth.controller.js";
import { validateRegisterInput, validateLoginInput } from "../utils/validation.js";

const router = express.Router();

router.post("/register", validateRegisterInput, registerUser);
router.post("/login", validateLoginInput, loginUser);

export default router;