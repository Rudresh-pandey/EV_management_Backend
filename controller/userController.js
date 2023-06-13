import User from "../models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const bcryptKey = bcrypt.genSaltSync(10);
const jwtSecret = '489iuoga20jkadhfaleqto090'

export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // checking existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(422).send({
                success: false,
                message: "already register",
            });
        }
        // creating new user
        const newUser = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptKey),
        });

        res.status(200).json({
            success: true,
            message: "User Register Successfully",
            newUser,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error in Registeration",
            err,
        });
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        //checking existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const checkPass = bcrypt.compareSync(password, existingUser.password);
            if (checkPass) {

                jwt.sign({ email: existingUser.email, id: existingUser._id }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;

                    res.cookie("token", token).json({
                        success: true,
                        message: "login success",
                    });
                })

            } else {
                res.status(401).json({
                    success: false,
                    message: "password incorrect , try again",
                });
            }
        } else {
            res.status(404).json({
                success: false,
                message: "user not found",
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error in Registeration",
            err,
        });
    }
}