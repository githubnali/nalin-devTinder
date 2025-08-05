const mongoose = require('mongoose');

const validator = require('validator');

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required:true,
            minLength: [4, "First name must be at least 4 characters"],
            maxLength: [50, "First name must not exceed 50 characters"],
            trim: true,
             validate(val) {
                if(!validator.isAlpha(val)) {
                    throw new Error("Your First Name Should Contains Only Alphabhetics" + val)
                }
            }
            
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
            // match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
            validate(val) {
                if(!validator.isEmail(val)) {
                    throw new Error("Invalid email address: " + val)
                }
            }

        },
        password: {
            type: String,
            required:true,
            minLength: [8, "Password must be at least 8 characters"],
            // validate: {
            //     validator(val) {
            //         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])/.test(val);
            //     },
            //     message: "Password must contain uppercase, lowercase, digit, and special character"

            // }
            validate(val) {
                if(!validator.isStrongPassword(val)) {
                    throw new Error("Password must contain uppercase, lowercase, digit, and special character:" + val)
                }
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
            // match: [/^https?:\/\/.+/, "Photo URL must be a valid link"]
            validate(val) {
                if(!validator.isURL(val)) {
                    throw new Error("Invalid Phot URL: " + val)
                }
            }

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


userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({_id: user._id}, "Nali@devtinder$123", {
        expiresIn: "7d",
    })

    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid =  await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    )

    return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);