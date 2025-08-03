const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required:true,
            minLength: 4,
            maxLength: 50,
            trim: true
        },
        lastName: {
            type: String
        },
        emailId: {
            type: String,
            required:true,
            unique: true,
            lowercase: true,
            trim: true

        },
        password: {
            type: String,
            required:true,
        },
        age: {
            type: Number,
            min: 18
        },
        gender: {
            type: String,
            validate(val) {
                if(!["male", "female", "others"].includes(val)) {
                    throw new Error("Gender data is not valid")
                }
            }
        },
        photoUrl: {
            type: String,
            default: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
        },
        about: {
            type: String,
            default: "tell me more about yourself"
        },
        skills: {
            type: [String],
        },
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model("User", userSchema);