import moongoose from "mongoose";

const commentSchema = new moongoose.Schema({
    content: {type: String, required: true},
    postId: {type: String, required: true},
    userId: {type: String, required: true},
    likes: {type: Array, default: []},
    numberOfLikes: {type: Number, default: 0},
},
{timestamps: true}
)

const Comment = moongoose.model("Comment", commentSchema);
export default Comment;