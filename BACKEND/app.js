import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import shorturlRoutes from "./src/routes/shorturl.routes.js";
import filecabinet from "./src/config/mongo.config.js";
import {redirectToFullUrl} from "./src/controller/shorturl.controller.js";
import { errorHandler, notFoundHandler } from "./src/utils/errorHandler.js";
import auth_routes from "./src/routes/auth.routes.js";
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

// Enable CORS for frontend (adjust origins as needed)
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173','http://localhost:3002', 'https://lynklyurl.vercel.app'],
  credentials: true,
}));


app.use((req, res, next) => {
    console.log("REQUEST:", req.method, req.originalUrl);
    next();
});
app.get("/health",(req,res)=>res.json({status:"ok"}));
app.use("/api/auth",auth_routes)
app.use("/api/create", shorturlRoutes);
app.get("/:id",redirectToFullUrl);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await filecabinet();
    app.listen(PORT, "0.0.0.0",()=>{
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();