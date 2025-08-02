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

connectDB()
    .then(() => {
        console.log("Database Connection Established.....")
        app.listen(1818, () => {
            console.log('Server is successfully created on 1818 port....')
        })
    }).catch((err) => {
        console.log("Database cannot be established", err)
    })

