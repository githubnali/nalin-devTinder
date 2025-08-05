const express = require("express");
const {validateSignupData} = require('../utils/validation');
const User = require('../models/user');

const bcrypt = require('bcrypt');

const validator = require('validator');

const authRouter = express.Router();

authRouter.post("/signup", async (req, resp) => {

    try {

        //Validation of data
        validateSignupData(req)

        const {password, firstName, lastName, emailId} = req.body

        //Encrypting the password
        const passwordHash = await bcrypt.hash(password, 10)
        console.log(passwordHash);

        // passing user data dynamically from an API
        const user = new User(
            {
                firstName, 
                lastName, 
                emailId, 
                password: passwordHash
            }
        )

        await user.save();
        resp.send("User Added Successfully");
    } catch(err) {
        resp.status(400).send("ERROR: " + err.message);
    }
})

authRouter.post("/login" , async(req, resp) => {
    try {
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId});

        if(!validator.isEmail(emailId)) {
            throw new Error("Please enter a valid email address: ", emailId)
        }

        if(!user) {
            throw new Error("Invalid Credentials")
        }

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid) {

            //Create a JWT Token
            const token = await user.getJWT()

            //Add the token to cookie and send the response back to the user
            resp.cookie("token", token)
            resp.send("User logged in successfully")
        }else {
            throw new Error("Invalid Credentials")
        }

    }catch(err) {
        resp.status(400).send("ERROR: " + err.message);
    }
})

module.exports = authRouter