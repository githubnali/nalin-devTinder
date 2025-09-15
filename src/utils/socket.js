const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");

const {ConnectionRequest} = require('../models/connectionRequest')


const getSecretRoomId = (userId, targetUserId) => {
    return crypto
        .createHash("sha256")
        .update([userId, targetUserId].sort().join("_"))
        .digest("hex");
}

const initializeSocket = (server) => {

    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173"
        }
    });

    io.on("connection",(socket) => {
        
        //Handle Events
        socket.on("joinChat", ({firstName, userId, targetUserId}) => {
            // always room should have unique id
            const roomId = getSecretRoomId(userId, targetUserId);

            console.log(firstName + " joiningRoom", roomId)
            socket.join(roomId)
        })

        socket.on("sendMessage", async({firstName, lastName, userId, targetUserId, text, profile}) => {            
            //save message in the database
            try {
                const roomId = getSecretRoomId(userId, targetUserId);
    
                console.log(firstName + " " + text + " " + profile);

                // check if userId and targetUserId are friends
                ConnectionRequest.findOne(
                    {
                    fromUserId: userId,
                    toUserId: targetUserId,
                    status: "accepted"
                    },
                    {
                        
                    }
                )

                let chat = await Chat.findOne({
                    participants: {$all: [userId, targetUserId]}
                })

                if(!chat) {
                    chat = new Chat({
                        participants: [userId, targetUserId],
                        messages: [],
                    })
                }

                chat.messages.push({
                    senderId: userId,
                    text
                })

                console.log(chat);

                await chat.save();

                io.to(roomId).emit("messageReceived", {firstName, lastName, text, profile, targetUserId})
            }catch(err) {
                console.error(err);
            }


        })

        socket.on("disconnect", () => {

        })
    })
}

module.exports = initializeSocket;