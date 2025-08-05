const express = require("express");

const profileRouter = express.Router();

const {userAuth} = require('../middlewares/auth')



profileRouter.get("/profile", userAuth, async(req, resp) => {

    try {

       const user = req.user;
       resp.send(user)

    }catch(err) {
        resp.status(400).send("ERROR: " + err.message);
    } 
})

module.exports = profileRouter