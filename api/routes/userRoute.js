import express from "express";
import { updateUser,deleteUser, signout, getUsers,getUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifuUser.js";

//=====================================================================//
const router = express.Router();

router.put('/update/:userId',verifyToken, updateUser)
router.delete('/delete/:userId',verifyToken,deleteUser);
router.post('/signout',signout)
router.get('/getusers',verifyToken, getUsers)
router.get('/:userId', getUser) // publick api call user data


export default router;