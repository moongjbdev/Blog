import express from 'express';
import { verifyToken } from '../utils/verifuUser.js';
import { createComment,getpostcomments } from '../controllers/commentController.js';
const router = express.Router();

router.post('/create',verifyToken, createComment);
router.get('/getpostcomments/:postId',getpostcomments);

export default router; 