import User from "../models/user.model.js";
import {validationResult} from "express-validator";
import authMiddleware from "../middlewares/auth.middleware.js";

const registerUser = async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {firstName,lastName,email,Password } = req.body
    if (!firstName || !lastName || !email || !Password) {
        return res.status(400).send('All fields are required');
    }
    const existedUser = await User.findOne({email});
    if (existedUser){
        return res.status(400).send('User already exists');
    }

    const hashedPassword = await User.hashPassword(Password);
    const newUser = await User.create({
        firstName:firstName,
        lastName:lastName,
        email, 
        Password: hashedPassword
    })
    await newUser.save();
    const token = newUser.generateAuthToken() ;
    
    res.status(200).send({ token, newUser });
}

const loginUser = async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, Password } = req.body;
    const user = await User.findOne({ email }).select('+Password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(Password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();
    // console.log(token);
    res.cookie('token', token);
    res.status(200).json({ token, user });
}

const getUserProfile = async (req,res,next)=>{
    res.status(200).json(req.user);
}


const logOutUser = async (req,res,next)=>{
    res.clearCookie('token');
    res.status(200).send('Logged out successfully');
}

export {registerUser,loginUser,getUserProfile,logOutUser};