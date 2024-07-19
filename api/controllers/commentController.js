import Comment from "../models/commentModel.js";

export const createComment = async (req, res, next) => {
    try {
        const { content, postId, userId } = req.body
        if(userId !== req.user._id){
            return next(errorHandle(401, "You are not allowed to create comment"));
        }

        const newComment = await Comment.create({
            content,
            postId,
            userId
        });
        await newComment.save()
        res.status(201).json(newComment);
    } catch (error) {
        next(error);
    }
}