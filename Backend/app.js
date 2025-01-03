import dotenv from "dotenv";
dotenv.config();
import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./db/db.js";
import userRouter from "./routes/user.routes.js"
import captainRouter from "./routes/captain.routes.js"
import mapRouter from "./routes/maps.routes.js"
const app=express();

connectToDB();

app.use(cors());
app.use(urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.use("/users",userRouter);
app.use("/captain",captainRouter);
app.use("/maps",mapRouter)

app.get("/",(req,res)=>{
    res.send("Hello World");
});
app.get("/userRoute",(req,res)=>{
    res.send("This is user Route");
});
export default app;

