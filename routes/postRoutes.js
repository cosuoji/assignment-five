import { Router } from "express";
import * as postController from "../controller/post.controller.js"
import { authMiddleware } from "../middleware/authenticate.middleware.js";


const postRoute = Router()
postRoute.get("/", postController.getAllPosts)
postRoute.post("/create", authMiddleware, postController.createPost)
postRoute.patch("/:postId",authMiddleware, postController.updatePost)
postRoute.get("/:postId", postController.getPostById)
postRoute.delete("/:postId", authMiddleware, postController.deletePostById)

export default postRoute