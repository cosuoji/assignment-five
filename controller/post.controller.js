import * as postService from  "../services/post.services.js"


export const createPost = async(req, res) =>{
    try{
        const {title, content} = req.body;
        const result = await postService.createPost(title, content)
        res.json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const updatePost = async(req, res) =>{
    try {
        const postId = req.params.postId;
        const {title, content} = req.body;
        const result = await postService.updatePost(postId, title, content)
        res.json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}