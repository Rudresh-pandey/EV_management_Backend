import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    organizer: String,
    description: String,
    type: String,
    mode: String,
    location: String,
    startDate: String,
    endDate: String,
    photos: [String],
    includes: String,
    priceType: String,
    price: Number,
    requirements: String,
    participants: Number,
    guests: [Object],

})

export default mongoose.model("Event", eventSchema);