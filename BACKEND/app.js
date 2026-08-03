import express from "express";
import {nanoid} from "nanoid";
import dotenv from "dotenv";
dotenv.config("./.env");
import urlSchema from "./src/models/shorturl.model.js";
import filecabinet from "./src/config/mongo.config.js";
const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.post("/api/create",(req,res)=>{
    console.log("Body:", req.body);
    const {url}= req.body;
    const ShortUrl = nanoid(7);
    const newUrl = new urlSchema({
        full_url: url,
        short_url: ShortUrl,
        clicks: 0,
    })
    newUrl.save()
    res.send(ShortUrl)
})

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