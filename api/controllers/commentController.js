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

export const getpostcomments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({
            createdAt: -1  // descending order by createdAt field
        })
        res.json(comments);
    } catch (error) {
        next(error);
    }
}

export const likecomment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(errorHandle(404, "Comment not found"));
        }
        const userIndex = comment.likes.indexOf(req.user._id)
        if (userIndex === -1) {
            comment.numberOfLikes += 1;
            comment.likes.push(req.user._id); // add like if user do not like before
        } else {
            comment.numberOfLikes -= 1;  
            comment.likes.splice(userIndex, 1);// remove like if user liked before
        }

        await comment.save();

        res.json(comment);
    } catch (error) {
        next(error);
    }
}