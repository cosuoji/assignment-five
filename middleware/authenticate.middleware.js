import jwt from "jsonwebtoken";
import {tokenToUse} from "../controller/auth.controller.js"

export let emailId, userId;

export const authMiddleware = (req, res, next) =>{

    //send the token to the header
    const authorization = tokenToUse;

    if(!authorization){
        return res.status(401).json({message: "Not Authorized to make or edit posts"});

    }

    //verify the token

    jwt.verify(authorization, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).json({message: "unauthorized"})
        }

        req.user = decoded
        emailId = decoded.emailId
        userId = decoded._id
        next()
    })
}