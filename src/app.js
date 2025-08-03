const express = require('express');

const {connectDB} =  require("./config/database");

const app = express();

const User = require('./models/user');
const user = require('./models/user');

//converts the JSON data into JS Obj
app.use(express.json())

app.post("/signup", async (req, resp) => {

    // passing user data dynamically from an API
    const user = new User(req.body)

    try {
        await user.save();
        resp.send("User Added Successfully");
    } catch(err) {
        resp.status(400).send("Error saving the user:" + err.message);
    }
})

//get user by email
app.get("/user", async (req, resp) => {
    const userEmail = req.body.emailId;

    try {
        const users = await User.find({emailId: userEmail});
        if(users.length === 0 ) {
            resp.status(404).send("User not found");
        } else {
            resp.send(users);
        }
    } catch(err) {
        resp.status(400).send("something went wrong");
    }

})

//Feed API - GET /feed get all the users from the database
app.get("/feed", async(req, resp) => {

    try {   
        const users = await User.find({});
        resp.send(users)

    } catch(err) {
        resp.status(400).send("something went wrong");
    }

})

app.delete("/user", async(req, resp) => {
    const userId = req.body.userId;
    try {
        //to get the user id by find by id and delete method
        const user = await User.findByIdAndDelete(userId);
        resp.send("User Deleted Successfully")
    } catch(err) {
        resp.status(400).send("something went wrong");
    }
})

//update the user using userId
app.patch("/user/:userId", async(req, resp) => {
    const userId = req.params?.userId;
    const userData = req.body;

    console.log(userData);


    try {

        const ALLOWED_UPDATES = [
            "photoUrl", "about", "gender", "age", "skills"
        ]

        const isUpdateAllowed = Object.keys(userData).every((k) =>
            ALLOWED_UPDATES.includes(k)
        )

        if(!isUpdateAllowed) {
           throw new Error("Update not allowed");
        }

        const updateUser = await User.findByIdAndUpdate({_id:userId}, userData, {
            returnDocument: 'before',
            runValidators: true,
        });

        console.log(updateUser)

        resp.send("User Updated Successfully")
    } catch(err) {
        resp.status(400).send("UPDATED FAILED: " + err.message);
    }
});

//update the user using emailID
// app.patch("/user", async(req, resp) => {
//     const userData = req.body;

//     try {
//         const updateUsingEmailId = await User.findOneAndUpdate({emailId:userData.emailId}, userData, {
//             returnDocument: "before"
//         })
//         console.log(updateUsingEmailId);
//         resp.send("Updated user with matching email id");
//     }catch(err) {
//         resp.status(400).send("something went wrong");
//     }
// })

connectDB()
    .then(() => {
        console.log("Database Connection Established.....")
        app.listen(1818, () => {
            console.log('Server is successfully created on 1818 port....')
        })
    }).catch((err) => {
        console.log("Database cannot be established", err)
    })

