const express = require("express");

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
                message: "You cannot send connection request to yourslef"
            })
        }

        //to user id is avivable in User Collection
        const toUser = await User.findById(toUserId);
        console.log(toUser)
        if(!toUser) {
            return resp.status(404).json({
                message: "User not found!!!"
            })
        }

        //check if there is any exisiting connection request nagaraju to suraj
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
        resp.status(400).send("ERROR: ", err.message)
    }
})

module.exports = requestRouter 