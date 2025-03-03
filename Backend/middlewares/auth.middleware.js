import User from "../models/user.model.js";
import captainModel from "../models/captain.model.js";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";

const authUser = async (req,res,next)=>{
    try {
        const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            console.error('Authentication error:', error);
            return res.status(401).send('Invalid token');
        }
        req.user = user;
        return next();
    }
    catch(error){
        return res.status(401).send('Invalid token');
    }
}

const authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // const isBlacklisted = await blackListTokenModel.findOne({ token: token });



    // if (isBlacklisted) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;
        return next()
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
}

export {authUser,authCaptain};