import { nanoid } from "nanoid";
export const generateID = (length) => {
    return nanoid(length);
}