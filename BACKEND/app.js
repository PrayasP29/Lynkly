import express from "express";
import {nanoid} from "nanoid";
import dotenv from "dotenv";
dotenv.config("./.env");
import shorturlRoutes from "./src/routes/shorturl.routes.js";
import urlSchema from "./src/models/shorturl.model.js";
import filecabinet from "./src/config/mongo.config.js";
const app=express();

app.use(shorturlRoutes);
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/create",shorturlRoutes);

app.get("/:id",async(req,res)=>{
    const {id}= req.params;
    const url = await urlSchema.findOne({short_url: id});
    if(url){
        url.clicks++;
        await url.save();
        return res.redirect(url.full_url);
    }
    return res.status(404).send("URL not found");
});

app.listen(3000,()=>{
    filecabinet()
    console.log("Server is running on port http://localhost:3000");
})