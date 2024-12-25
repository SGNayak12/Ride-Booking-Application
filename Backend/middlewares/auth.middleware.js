import User from "../models/user.model.js";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";

const authMiddleware = async (req,res,next)=>{
    try {
        const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
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
export default authMiddleware;