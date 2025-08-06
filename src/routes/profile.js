const express = require("express");

const profileRouter = express.Router();

const {userAuth} = require('../middlewares/auth');

const {validateProfileEditData} = require("../utils/validation");

const bcrypt = require('bcrypt')



profileRouter.get("/profile/view", userAuth, async(req, resp) => {

    try {

       const user = req.user;
       resp.send(user)

    }catch(err) {
        resp.status(400).send("ERROR: " + err.message);
    } 
})

profileRouter.patch("/profile/edit", userAuth, async(req, resp) => {
    
    try {
        //data sanitization
        if(!validateProfileEditData(req)) {
            throw new Error("Invalid Edit Request")
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key]);

        await loggedInUser.save();

        resp.json({
            message: `${loggedInUser.firstName}, your profile Updated Successfully`,
            data: loggedInUser,
        })

    }catch(err) {
        resp.status(400).send("ERROR: " + err.message);
    }
})

profileRouter.patch("/profile/password", userAuth,  async(req, resp) => {
    const {currentPassword, newPassword} = req.body;

    //check if both password are there or not
    if(!currentPassword || !newPassword) {
        return resp.status(400).json({message: "Both current and new password are required"})
    }

    try {
       const currentUser = req.user;
     
       const isMatch = await bcrypt.compare(currentPassword, currentUser.password);

       if(!isMatch) {
            return resp.status(400).json({
                message: 'Current password is incorrect'
            });
       }

       const hashedPassword = await bcrypt.hash(newPassword, 10);

       currentUser.password = hashedPassword

       await currentUser.save()

       resp.json({
        message: "Password changed successfully"
       })

    }catch(err) {
        resp.status(500).json({message: 'Server error', Error: err.message})
    }



})

module.exports = profileRouter