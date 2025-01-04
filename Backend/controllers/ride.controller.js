import rideModel from "../models/ride.model.js"
import { validationResult } from "express-validator";
import {getFare, getOTP} from "../services/ride.service.js";


const getRideFare = async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination } = req.query;
    const fare = await getFare(pickup, destination);
    res.status(200).json({ fare });
}


const createRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType } = req.body;
    const fare = await getFare(pickup, destination);
    
    const ride = await rideModel.create({
        pickup,
        destination,
        vehicleType,
        otp:getOTP(6),
        user: req.user._id,
        fare:fare[vehicleType],
    });
    await ride.save();
    res.status(200).json({ ride });
}

export { createRide,getRideFare };