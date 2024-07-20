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

export const editcomment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(errorHandle(404, "Comment not found"));
        }
        if (comment.userId !== req.user._id && !req.user.isAdmin ) {
            return next(errorHandle(401, "You are not allowed to edit this comment"));
        }

        const editComment = await Comment.findByIdAndUpdate(req.params.commentId,
            {
                content: req.body.content
            },{new: true}
        )


        res.json(editComment);
    } catch (error) {
        next(error);
    }
}

export const deletecomment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(errorHandle(404, "Comment not found"));
        }
        if (comment.userId!== req.user._id &&!req.user.isAdmin ) {
            return next(errorHandle(401, "You are not allowed to delete this comment"));
        }
        await Comment.findByIdAndDelete(req.params.commentId);
        res.json({message: "Comment deleted successfully"});
    } catch (error) {
        next(error);
    }
}

export const getcomments = async (req, res, next) => {
    if (!req.user.isAdmin)
      return next(errorHandler(403, 'You are not allowed to get all comments'));
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.sort === 'desc' ? -1 : 1;
      const comments = await Comment.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
      const totalComments = await Comment.countDocuments();
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      const lastMonthComments = await Comment.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
      res.status(200).json({ comments, totalComments, lastMonthComments });
    } catch (error) {
      next(error);
    }
  };