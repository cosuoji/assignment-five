import User from "../database/user.schema.js";
import ErrorWithStatus from "../exceptions/error.with.status.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export const login = async(email, password) =>{
    //check if email exists
    const user = await User.findOne({email})
    if(!user){
        throw new ErrorWithStatus("user not found, 404")
    }

    //check if password matches 
    if(!bcrypt.compareSync(password, user.password)){
        throw new ErrorWithStatus("username or password incorrect", 400)
    }

    //Generate the JWT Token
    const JWT_SECRET = process.env.JWT_SECRET || "secret";
    const token = jwt.sign({
        email:user.email, _id:user._id}, JWT_SECRET, {expiresIn: "1hr"})

    return {
        message: "Login Successful",
        data:{
            accessToken: token,
        }
    }
}

export const register = async (name, email, password, confirmPassword) =>{
    //check if email exists
    const user = await User.findOne({email})
    if(user){
        throw new ErrorWithStatus("user already exists", 400)
    }

    //check if the password texts match 
    if(password !== confirmPassword){
        throw new ErrorWithStatus("Passwords do not match", 400)
    }

    //hash the passwords with bcrypt
    password = await bcrypt.hash(password, 10);

    //create a new User
    const newUser = new User({
        name, email, password
    })


    //save this user
    await newUser.save()
    delete newUser.password;

    return {
        message: "User created successfully",
        data: {
            id: newUser.id,
            name: newUser.name, 
            email: newUser.email,
            createdAt: newUser.createdAt,

        }
    }

}

