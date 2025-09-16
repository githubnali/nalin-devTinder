const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

const User = require('../models/user')

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
    try {
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

userRouter.get("/feed", userAuth, async(req, resp) => {
    try {
        //User should see all other cards except his own card
        //card of his connections
        //ignored people peofile
        //already sent connection

        //Example: eswar(new user), Nagaraju, sai teja, pardhu, gopi, david
        //Example: eswar => [Nagaraju, sai teja, pardhu, gopi, david] can see all the profiles except himself
        //Example: eswar -> Nagaraju => [sai teja, pardhu, gopi, david] eswar should see everyone except nagaraju and him self
        //Example: eswar -> sai teja => [pardhu, gopi, david] eswar should see everyone except nagaraju, sai teja and him self
        //Example: esawr --> sai teja (rejected eswar request) [nagaraju, pardhu, gopi, david] Both of them can't see each other profile
        //Example: esawr --> nagaraju (accepted eswar request) [pardhu, gopi, david] Both of them can't see each other profile
        //Example: nagarju ==> [sai teja, pardhu, gopi, david]


        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let  limit = parseInt(req.query.limit) || 10;

        //limiting the users if data is more than 50 users
        limit = limit > 50 ? 50 : limit

        const skip = (page-1)*limit

        //let's findout first all the connection req (send, receieve)
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId")

        const hideUsersFromFeed = new Set();

        connectionRequest.forEach(req => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })


        const feedUsers = await User.find({
            $and: [
                { _id: {$nin: Array.from(hideUsersFromFeed)}},
                {_id: {$ne: loggedInUser._id}}
            ]
           
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)


        resp.json({data: feedUsers})
    } catch(err) {
        resp.status(400).json({
            message: err.message
        })
    }
})

module.exports = userRouter