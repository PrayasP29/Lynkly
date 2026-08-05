import express from "express";
import dotenv from "dotenv";
dotenv.config("./.env");
import shorturlRoutes from "./src/routes/shorturl.routes.js";
import filecabinet from "./src/config/mongo.config.js";
import {redirectToFullUrl} from "./src/controller/shorturl.controller.js";
import { errorHandler, notFoundHandler } from "./src/utils/errorHandler.js";
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(shorturlRoutes);
app.use("/api/create",shorturlRoutes);

app.get("/:id",redirectToFullUrl);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
    await filecabinet();
    app.listen(3000,()=>{
        console.log("Server is running on port http://localhost:3000");
    });
};

startServer();