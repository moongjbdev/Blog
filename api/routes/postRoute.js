import express from 'express';
import {verifyToken} from '../utils/verifuUser.js'
import { create,getposts } from '../controllers/postController.js';
const router = express.Router();

router.post('/create',verifyToken, create);
router.post('/getposts', getposts);


export default router