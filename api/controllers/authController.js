import User from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import { errorHandle } from "../utils/error.js"
import jwt from "jsonwebtoken"
import { removeVietnameseTones } from "../utils/removeTones.js"

export const signup = async (req, res, next) => {
    const { username, email, password} = req.body
    if(!username || !email || !password || username === "" || email === "" || password === ""){
        next(errorHandle(400, "Please fill all the fields"))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username,email,
        password: hashedPassword
    })

    try {
        await newUser.save();
        res.json({message: "Sign Up successful"})
    } catch (error) {
        next(error)
    }

    
}
export const signin = async (req, res, next) => {
    const { email, password } = req.body
    if(!email || !password || email === "" || password === ""){
        return next(errorHandle(400, "Please fill all the fields"))
    }

    try {
        const validUser = await User.findOne({email})
        if(!validUser){
            return next(errorHandle(401, "User not found"))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword){
            return next(errorHandle(401, "Invalid password"))
        }   
        const token = jwt.sign({_id: validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_SECRET)

        //hidden password
        const {password: a, ...rest} = validUser._doc

        res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest)
    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    const {email, name, googlePhotoUrl} = req.body
    try {
        //check if user already exists
        const user = await User.findOne({email})
        if(user){
            //if user already exists, return token
            const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET)
            //hidden password when return
            const {password: pass, ...rest} = user._doc
            res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest)
        }else {
            //if user does not exist, create new user
            //create password for user's google account
            const generatedPassword = Math.random().toString(36).slice(-8) 
            + Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
            //create new user
            const newUser = new User({
                //Bùi Minh Khánh => buiminhkhanh + randomnumber
                username: removeVietnameseTones(name).toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl
            })
            await newUser.save()
            const token = jwt.sign({_id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET)
            const {password: pass, ...rest} = newUser._doc
            res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest)
        }
        
    } catch (error) {
        next(error)
    }
}