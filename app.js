import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { profile, userLogin, userRegister } from "./controller/userController.js";

import cors from "cors";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
}));

dotenv.config();
connectDB();

app.post("/register", userRegister);
app.post("/login", userLogin)
app.get("/profile", profile)

app.listen(process.env.PORT, () => {
    console.log(`on port ${process.env.PORT}`)
})