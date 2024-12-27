import captainModel from "../models/captain.model.js";
import { validationResult } from "express-validator";


const registerCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstname,lastname, email, password, vehicle } = req.body;
    const { color, plate, capacity, vehicleType } = vehicle;


    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exist' });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainModel.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    await captain.save();
    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });

}

const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, captain });
}

const getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

const logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    // await blackListTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successfully' });
}

export { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };