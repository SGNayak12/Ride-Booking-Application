import {getDistanceTime} from "../services/maps.service.js";
import crypto from "crypto";

const getFare = async(pickup,destination)=>{
    if(!pickup && !destination){
        throw new Error("Pickup and destination address is required");
    }
    const distanceTime=await getDistanceTime(pickup,destination);
    const distanceValue = distanceTime.distance?.value;
    const durationValue = distanceTime.duration?.value;

    if (distanceValue === undefined || durationValue === undefined) {
        throw new Error("Invalid distance or duration data received");
    }

    const baseFare={
        car:40,
        auto:30,
        moto:20
    }
    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };
    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };
    return fare;
}

const getOTP = (num) =>{
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}
export {getFare,getOTP};

