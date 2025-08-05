const express = require("express");

const requestRouter = express.Router();

const {userAuth} = require('../middlewares/auth')


requestRouter.post("/sendingConnectionRequest", userAuth,  async(req, resp) => {

    const user = req.user;
    //sending a connection request
    console.log("Sending a connection request")

    resp.send(user.firstName + " sending the connection request")
})

module.exports = requestRouter