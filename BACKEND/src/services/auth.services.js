import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "../dao/user.dao.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const token=await signToken({id:newUser._id,email:newUser.email});