import { Router } from "express";
import {geneMiddleware} from "../middleware/generatedMiddleware.js"
import * as authcontroller from "../controller/auth.controller.js"
import {loginSchema, registerSchema } from "../validations/auth.validations.js"

const authRoute = Router();

authRoute.post("/register", geneMiddleware(registerSchema), authcontroller.register)
authRoute.post("/login" , geneMiddleware(loginSchema), authcontroller.login)

export default authRoute