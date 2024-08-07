import express from 'express';
import { verifyToken } from '../utils/verifuUser.js';
import { createComment,getpostcomments,likecomment,editcomment,deletecomment,getcomments } from '../controllers/commentController.js';
const router = express.Router();

router.post('/create',verifyToken, createComment);
router.get('/getpostcomments/:postId',getpostcomments);
router.put('/likecomment/:commentId',verifyToken, likecomment);
router.put('/editcomment/:commentId',verifyToken, editcomment);
router.delete('/deletecomment/:commentId',verifyToken, deletecomment);
router.get('/getcomments',verifyToken, getcomments);


export default router; 