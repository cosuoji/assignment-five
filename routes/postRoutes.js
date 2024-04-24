import { Router } from "express";
import * as postController from "../controller/post.controller.js"
import { authMiddleware } from "../middleware/authenticate.middleware.js";


const postRoute = Router()
postRoute.post("/create", authMiddleware, postController.createPost)
postRoute.patch("/:postId",authMiddleware, postController.updatePost)
postRoute.get("/:postId", postController.getPostById)

export default postRoute