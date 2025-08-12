const express = require("express");

const mongoose = require('mongoose')

const requestRouter = express.Router();

const {userAuth} = require('../middlewares/auth')

const ConnectionRequest = require('../models/connectionRequest');
const User = require("../models/user");


requestRouter.post("/request/send/:status/:toUserId", userAuth,  async(req, resp) => {

    try {
        const  fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        //allowed statuses
        const allowedStatus = ["ignored", "interested"];

        // not allowed other than ignored, interested
        if(!allowedStatus.includes(status)) {
            return resp.status(400).json({
                message: "Invalid Status type " + status
            });
        }

        //check the fromUserId and toUserId same or not
        if(fromUserId.toString() === toUserId) {
            return resp.status(400).json({
                message: " You cannot send connection request to yourslef"
            })
        }

        //check for valid MongoDB ObjectId is or not
        if (!mongoose.Types.ObjectId.isValid(toUserId)) {
            return resp.status(400).json({ error: 'Invalid user ID' });
        }

        //to user id is avivable in User Collection
        const toUser = await User.findById(toUserId);
        if(!toUser) {
            return resp.status(404).json({
                message: "User not found!!!"
            })
        }

        //check if there is any exisiting connection request nagaraju to saiteja
        const exisitingConnectionRequest = await ConnectionRequest.findOne(
            {
                $or: [
                    {fromUserId, toUserId},
                    {fromUserId: toUserId, toUserId: fromUserId}
                ], 
            }
        )

        //check exisiting connection condition
        if(exisitingConnectionRequest) {
            return resp.status(400).json({
                message: "Connection Request Already Exist!!"
            })
        }

        //making the new connection request
        const connectionRequest = new ConnectionRequest(
            {
                fromUserId,
                toUserId,
                status
            }
        )

        //saved into DB
        const data = await connectionRequest.save()

        //sending the response
        resp.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName,
            data
        })


    }catch(err) {
        resp.status(400).send("ERROR: " + err.message)
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req, resp) => {

    try {
        //logged in user
        const loggedInUser = req.user;
        
        //getting request params from user
        const {status, requestId} = req.params;

        //validate the status
        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)) {
            return resp.status(400).json({
                message: "Status Not Allowed"
            })
        }

        // fine the connection request with req id, touserId, status, matching status only interested
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        })

        if(!connectionRequest) {
            return resp.status(404).json({
                message: "Connection request not found"
            })
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        resp.json(
            {
                message: "Connection request " + status, 
                data
            }
        )
    }catch(err) {
        resp.status(400).send("Error: "+ err.message)
    }
})

module.exports = requestRouter