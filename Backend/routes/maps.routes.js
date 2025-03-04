import express from "express";
const router=express.Router();
import {authUser} from "../middlewares/auth.middleware.js"
import {getCoordinates,getDistanceAndTime,getAutoCompleteAndSuggestions} from "../controllers/maps.controller.js"
import { query } from "express-validator";


router.get("/get-coordinates",authUser,[
        query('address').isString().isLength({ min: 3 }),
]
    ,getCoordinates);

router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authUser,
    getDistanceAndTime
)


router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authUser,
    getAutoCompleteAndSuggestions
)
export default router;