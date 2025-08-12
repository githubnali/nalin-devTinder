const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

const userRouter = express.Router();

//get all the pending connection requests from logged in user
userRouter.get("/user/requests/received", userAuth, async (req, resp) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName photoUrl age gender about skills")

        resp.json({
            message: "data fetched successfully",
            data: connectionRequest
        })
    }catch(err) {
        resp.statusCode(400).send("ERROR: " + err.message)
    }
})

module.exports = userRouter