import Posts from "../database/post.schema.js"
import ErrorWithStatus from "../exceptions/error.with.status.js"
import User from "../database/user.schema.js"
import { userId } from "../middleware/authenticate.middleware.js"



export const createPost = async(title,content) =>{
    //check if user exists and get his info
    const userToPost = await User.find({_id:userId});

    if(!userToPost){
        throw new ErrorWithStatus("User not found", 400)
    }

    //get the author of the posts name
    const author = userToPost[0].name
    const email = userToPost[0].email
    //create the post for the user
    const newPost = new Posts({title, content, userId});
    await newPost.save()

    let postId = newPost._id.toHexString()

    return {
        message: "new post made",
        data:{
            id: postId,
            title: newPost.title,
            body: newPost.content,
            user:{
            id: userId,
            name: author,
            email: email,
            createdAt: newPost.createdAt,
            updatedAt: new Date().toISOString()
            }
        }
    }
    
}

export const updatePost = async (postId, title, content)=>{
    //check if the post exists
    const postToEdit = await Posts.find({_id: postId})
    if(!postToEdit){
        throw new ErrorWithStatus("post not found", 400)
    }
    if(postToEdit[0].userId !== userId){
        throw new ErrorWithStatus("You don't have permission to edit this blog")
    }

    //get the author of the posts name
    const author = postToEdit[0].name
    const email = postToEdit[0].email


    postToEdit[0].title = title
    postToEdit[0].content = content

    return {
        message: "post edited",
        data:{
            id: postId,
            title: postToEdit[0].title,
            body: postToEdit[0].content,
            user:{
            id: userId,
            name: author,
            email: email,
            createdAt: postToEdit[0].createdAt,
            updatedAt: new Date().toISOString()
            }
        }
    }
    

}