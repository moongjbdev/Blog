import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import { errorHandle } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
    //Check user id from middleware == user id parameter
    if (req.user._id !== req.params.userId){
        return next(errorHandle(401, "You are not allowed to update this user!!"))
    }
    //handle password change if exists
    if (req.body.password){
        if(req.body.password < 6 ){
            return next(errorHandle(400, "Password must be at least 6 characters"))
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    //handle username change if exists
    if(req.body.username){
        //check length of username
        if(req.body.username.length < 7 || req.body.username.length > 20){
            return next(errorHandle(400, "Username must be between 7 and 20 characters"))
        }
        //check if username have spaces
        if(req.body.username.includes(" ")){
            return next(errorHandle(400, "Username must not contain spaces"))
        }
        //check lower case
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandle(400, "Username must be lowercase"))
        }
        //check char
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandle(400, "Username must contain only letters and numbers"))
        }

        

    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password:  req.body.password
            }
        }, {new: true})
        const {password, ...rest} = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user._id !== req.params.userId){
        return next(errorHandle(401, "You are not allowed to delete this user!!"))
    } 
    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        next(error)
    }

}