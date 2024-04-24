import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/authRoutes.js";
import postRoute from "./routes/postRoutes.js";



dotenv.config();
const app = express()
app.use(express.json())
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI


app.use("/", authRoute)
app.use("/posts", postRoute)

app.all("*", (req, res)=>{
    res.status(404);
    res.json({
        message: "Not Found"
    })
})


mongoose.connect(MONGODB_URI)
    .then(()=>{
        console.log("Connected to DB")
        app.listen(PORT, _ =>{
            console.log("app is running on PORT", PORT)
        })
    })

