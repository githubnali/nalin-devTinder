const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required:true,
            minLength: [4, "First name must be at least 4 characters"],
            maxLength: [50, "First name must not exceed 50 characters"],
            trim: true
        },
        lastName: {
            type: String,
            trim: true,
            default: ""
        },
        emailId: {
            type: String,
            required:[true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]

        },
        password: {
            type: String,
            required:true,
            minLength: [8, "Password must be at least 8 characters"],
            validate: {
                validator(val) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])/.test(val);
                },
                message: "Password must contain uppercase, lowercase, digit, and special character"

            }
        },
        age: {
            type: Number,
            min: [18, "Minimum age is 18"],
            max: [100, "Age must be below 100"]
        },
        gender: {
            type: String,
            validate(val) {
                if(!["male", "female", "others"].includes(val)) {
                    throw new Error("Gender must be male, female, or others")
                }
            }
        },
        photoUrl: {
            type: String,
            default: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
            match: [/^https?:\/\/.+/, "Photo URL must be a valid link"]
        },
        about: {
            type: String,
            default: "Tell me about yourself",
            maxLength: [200, "About section must not exceed 200 characters"]
        },
        skills: {
            type: [String],
            validate: [
                {
                    validator(value) {
                        return Array.isArray(value) && value.length <= 15;
                    },
                    message: "You can add up to 15 skills only"
                },
                {
                    validator(value) {
                        return value.every((s) => typeof s === "string");
                    },
                    message: "Skills must be an array of strings"
                }
            ]
        },
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model("User", userSchema);