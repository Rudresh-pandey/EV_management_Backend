import User from "../models/userModel.js"
import Event from "../models/eventModel.js"
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

                jwt.sign({
                    email: existingUser.email,
                    id: existingUser._id,
                }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie("token", token).json({
                        existingUser
                    });
                })
                // console.log(existingUser)
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

export const profile = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id, github, bio, twitter, website, linkedin } = await User.findById(userData.id)
            // const founduser = await User.findById(userData.id)
            // res.json(founduser);
            res.json({ name, email, _id, github, bio, twitter, website, linkedin })

        })
    } else {
        res.json(null);
    }
}

export const userDetail = async (req, res) => {
    const { id, glink, tlink, wlink, llink } = req.body;
    const updateUser = await User.findByIdAndUpdate(id, {
        github: glink,
        linkedin: llink,
        twitter: tlink,
        website: wlink,
    });
    res.json(updateUser);
}

export const userLogout = async (req, res) => {
    res.cookie('token', '').json(true);
}

export const newCreatedEvent = async (req, res) => {
    const { token } = req.cookies;
    const {
        title, location, description, eventType, eventMode, requirements, startDate, endDate, price
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const eventDoc = await Event.create({
            owner: userData.id,
            title,
            location,
            description,
            eventType,
            eventMode,
            requirements,
            startDate,
            endDate,
            price,
        })

        res.json(eventDoc);

    })
}




export const newEvent = async (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Event.find({ owner: id }))
    })
}

export const joinEvent = async (req, res) => {
    const { token } = req.cookies;
    const { event } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Event.findByIdAndUpdate(event, { joinedUser: id }))
        // console.log(eventId)
        // res.json(userEventUpdate);
    })
}

export const Events = async (req, res) => {
    res.json(await Event.find());
}

export const EventDetail = async (req, res) => {
    // console.log(req.params.eventid);
    const event = await Event.findOne({ _id: req.params.eventid });
    res.json(event);
}

export const eventsJoined = async (req, res) => {
    const { token } = req.cookies;

    // return new Promise((resolve, reject) => {
    //     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    //         const { eventsJoined } = await User.findById(userData.id);
    //         const filterdEvents = eventsJoined.filter(function (ele, pos) {
    //             return eventsJoined.indexOf(ele) === pos;
    //         })
    //         let Events = []
    //         filterdEvents.map(async (eve) => {
    //             const event = await Event.findOne({ _id: eve });
    //             Events.push(event);
    //         })

    //         resolve(Events);

    //     })
    // })

    // jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    //     const { eventsJoined } = await User.findById(userData.id);
    //     const filterdEvents = eventsJoined.filter(function (ele, pos) {
    //         return eventsJoined.indexOf(ele) === pos;
    //     })
    //     let Events = []
    //     filterdEvents.map(async (eve) => {
    //         const event = await Event.findOne({ _id: eve });
    //         Events.push(event);
    //     })

    //     res.json(Events);

    // })
    // jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    //     const { eventsJoined } = await User.findById(userData.id);
    //     res.json(eventsJoined);
    // })
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        res.json(await Event.find({ joinedUser: userData.id }));
    })
}