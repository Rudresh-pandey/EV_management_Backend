import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    bio: {
        type: String
    },
    github: {
        type: String,
    }
    ,
    linkedin: {
        type: String,
    }
    ,
    twitter: {
        type: String,
    }
    ,
    website: {
        type: String,
    }
    ,
    eventsJoined: {
        type: [String],
    }
});

export default mongoose.model("User", userSchema);