import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type: String, 
        requires: true,
    },
    confirmPassword:{
        type: String, 
        requires: true,
    }
}, {
    timestamps: true
})

userSchema.set("toJSON", {
    virtuals: true, 
    versionKey: false, 
    transform: function(doc, ret){
        delete ret._id
    }
})

const User = mongoose.model("User", userSchema)
export default User