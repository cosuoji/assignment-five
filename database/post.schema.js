import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    }, 
    userId:{
        type:String,
        trim: true
    }
}, {
    timestamps: true
})

postSchema.set("toJSON", {
    virtuals: true, 
    versionKey: false, 
    transform: function(doc, ret){
        delete ret._id
    }
})

const Posts = mongoose.model("Posts", postSchema)
export default Posts