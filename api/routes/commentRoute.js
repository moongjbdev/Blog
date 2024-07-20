import express from 'express';
import { verifyToken } from '../utils/verifuUser.js';
import { createComment,getpostcomments,likecomment,editcomment } from '../controllers/commentController.js';
const router = express.Router();

router.post('/create',verifyToken, createComment);
router.get('/getpostcomments/:postId',getpostcomments);
router.put('/likecomment/:commentId',verifyToken, likecomment);
router.put('/editcomment/:commentId',verifyToken, editcomment);

export default router; 