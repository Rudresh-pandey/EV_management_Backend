import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { userLogin, userRegister } from "./controller/userController.js";

import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
}));

dotenv.config();
connectDB();

app.post("/register", userRegister);
app.post("/login", userLogin)


app.listen(process.env.PORT, () => {
    console.log(`on port ${process.env.PORT}`)
})