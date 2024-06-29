import Post from "../models/postModel.js"
import { errorHandle } from "../utils/error.js"

export const create = async (req, res, next) => {
    //check if user is admin => next
    if (!req.user.isAdmin) {
        return next(errorHandle(401, "You are not allowed to create post"))
    }
    if(!req.body.title || !req.body.content ) {
        return next(errorHandle(400, "Please fill all the fields"))
    }
    const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9]/g, "-")
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user._id
    })
    try {
        const savePost = await newPost.save()
        res.status(201).json(savePost)
    } catch (error) {
        next(error)
    }
}