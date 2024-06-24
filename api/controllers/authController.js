import User from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import { errorHandle } from "../utils/error.js"

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