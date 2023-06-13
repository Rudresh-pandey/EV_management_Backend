import mongoose from "mongoose";

const connectDB = () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL);
        console.log("connected to DB")
    } catch (err) {
        console.log(err);
    }
}

export default connectDB;