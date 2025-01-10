import express from "express";
const router=express.Router();
import { validationResult,body,query } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";
import { createRide } from "../controllers/ride.controller.js";
import { getRideFare } from "../controllers/ride.controller.js";


router.get('/get-fare',
    query('pickup').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authUser,
    getRideFare
)

router.post('/create-ride',
    authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    createRide
)

export default router;


