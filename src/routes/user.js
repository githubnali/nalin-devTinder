const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"

//get all the pending connection requests from logged in user
userRouter.get("/user/requests/received", userAuth, async (req, resp) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA)

        resp.json({
            message: "data fetched successfully",
            data: connectionRequest
        })
    }catch(err) {
        resp.statusCode(400).send("ERROR: " + err.message)
    }
})

//check the connection of the user
userRouter.get("/user/connections", userAuth, async(req, resp) => {
    try{
        const loggedInUser = req.user;

        //find the user connection either fromUser/toUser
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status:"accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequest.map((row) =>  {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()) {
               return row.toUserId
            }
            return row.fromUserId
        });

        resp.json({
            data
        })
    }catch(err) {
        resp.status(400).send({message: err.message})
    }
})

module.exports = userRouter