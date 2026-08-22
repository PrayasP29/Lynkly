import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser, findUserById } from "../dao/user.dao.js";
import { CookiesOptions, RefreshTokenCookieOptions } from "../config/config.js";
import { recordFailure, clearFailures } from "../utils/rateLimit.js";


const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};


const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "30d"
        }
    );
};


export const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;


        // Check existing user
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            recordFailure(req);
            return res.status(400).json({
                message: "User already exists"
            });
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create user
        const newUser = await createUser({
            name,
            email,
            password: hashedPassword
        });


        // Generate JWT
        const token = generateToken(newUser);


        // Set cookie
        res.cookie(
            "token",
            token,
            CookiesOptions
        );

        res.cookie(
            "refreshToken",
            generateRefreshToken(newUser),
            RefreshTokenCookieOptions
        );


        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });



    } catch (error) {

        return res.status(500).json({
            message: "Something went wrong. Please try again."
        });

    }
};



export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;


        // Find user
        const user = await findUserByEmail(email);


        if (!user) {
            recordFailure(req);
            return res.status(404).json({
                message: "User not found"
            });
        }


        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );


        if (!isPasswordCorrect) {
            recordFailure(req);
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        clearFailures(req);


        // Generate JWT
        const token = generateToken(user);


        // Set cookie
        res.cookie(
            "token",
            token,
            CookiesOptions
        );

        res.cookie(
            "refreshToken",
            generateRefreshToken(user),
            RefreshTokenCookieOptions
        );


        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });


    } catch (error) {

        return res.status(500).json({
            message: "Something went wrong. Please try again."
        });

    }
};



export const getCurrentUser = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const user = await findUserById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });


    } catch (error) {

        return res.status(500).json({
            message: "Something went wrong. Please try again."
        });

    }
};



export const logoutUser = async (req, res) => {
    try {

        // Clear authentication cookies
        res.clearCookie("token", CookiesOptions);
        res.clearCookie("refreshToken", RefreshTokenCookieOptions);


        return res.status(200).json({
            message: "User logged out successfully"
        });


    } catch (error) {

        return res.status(500).json({
            message: "Something went wrong. Please try again."
        });

    }
};