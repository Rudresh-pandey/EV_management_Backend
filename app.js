import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { EventDetail, Events, joinEvent, newCreatedEvent, newEvent, profile, userDetail, userLogin, userLogout, userRegister } from "./controller/userController.js";

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
app.post("/login", userLogin);
app.get("/profile", profile);
app.post("/account/edit", userDetail);
app.post("/logout", userLogout);
app.post('/add-new-event', newCreatedEvent)
app.post('/joinEvent', joinEvent)
app.get('/eventscreated', newEvent)
app.get('/events', Events)
app.get('/events/:eventid', EventDetail)

app.listen(process.env.PORT, () => {
    console.log(`on port ${process.env.PORT}`)
})