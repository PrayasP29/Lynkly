import { nanoid } from "nanoid";
import {CookiesOptions} from "../config/config.js";
export const generateID = (length) => {
    return nanoid(length);
}

export const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, CookiesOptions);
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid token");
    }
}