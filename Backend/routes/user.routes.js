import Router from "express";
import {body} from "express-validator";
const router=Router();
import {registerUser,loginUser,getUserProfile,logOutUser} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('lastName').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], loginUser);

router.get('/profile',authMiddleware,getUserProfile);

router.get('/logout',authMiddleware,logOutUser);

export default router;