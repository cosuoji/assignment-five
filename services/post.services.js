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
try{
        //check if the post exists
    const postToEdit = await Posts.find({_id: postId})
    if(postToEdit.length < 1){
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
catch(err){
    throw new ErrorWithStatus(err.message, 500)
}

}

export const getPostById = async(postId) =>{
try{
        //check if the post exists
    const singularPost = await Posts.find({_id: postId})
    if(singularPost.length < 1) {
        throw new ErrorWithStatus("post not found", 400)
    }

    const authorDetails = await User.find({_id: singularPost[0].userId})
    //get the author of the posts name
    const author = authorDetails[0].name
    const email = authorDetails[0].email
    
    return {
      message: "Post",
        data:{
            id: postId,
            title: singularPost[0].title,
            body: singularPost[0].content,
            user:{
            id: userId,
            name: author,
            email: email,
            createdAt: singularPost[0].createdAt,
            }
        }
    }
}
catch(err){
    throw new ErrorWithStatus(err.message, 500)
}

}

export const deletePostById = async(postId) =>{
    try{
     //check if the post exists
    const postToDelete = await Posts.find({_id: postId})
    if(postToDelete.length < 1) {
        throw new ErrorWithStatus("post not found", 400)
    }
   
    console.log(postToDelete)

    if(userId !== postToDelete[0].userId){
        throw new ErrorWithStatus("Not Authorized to delete this post", 400)
    } else {
        await Posts.deleteOne({_id:postId})
    }



    return {
        message: "Post Deleted"
    }

    }
    catch(err){
        throw new ErrorWithStatus(err.message, 500)
    }
}

export const getAllPosts = async(orderRequest, page = 1, limit = 10) =>{

    try{
     //set skip information and get blog total 
    const skip = (page - 1) * limit;
    const total = await Posts.countDocuments();


    //Get the sort request 
    const {order} = orderRequest;

    //sort queries
    if(order === "createdAt"){
        const posts = await Posts.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
        return { data: posts, meta: {page, limit, total}}

    }

    const posts = await Posts.find().skip(skip).limit(limit)
    return {data: posts, meta: {page, limit, total}}
    }
    catch(error){
        throw new ErrorWithStatus(error.message, 500)
    }
}