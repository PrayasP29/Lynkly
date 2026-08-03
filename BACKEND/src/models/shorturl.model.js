import moongoose from "mongoose";

const shortUrlSchema = new moongoose.Schema({
    full_url: {
        type: String,
        required: true,
    },
    short_url: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    user_id: {
        type: moongoose.Schema.Types.ObjectId,
        ref: "User",        
        //required: true,
    },
});

const ShortUrl = moongoose.model("ShortUrl", shortUrlSchema);

export default ShortUrl;