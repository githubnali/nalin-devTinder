const express = require('express');

const {connectDB} =  require("./config/database");

const app = express();

const User = require('./models/user')

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

connectDB()
    .then(() => {
        console.log("Database Connection Established.....")
        app.listen(1818, () => {
            console.log('Server is successfully created on 1818 port....')
        })
    }).catch((err) => {
        console.log("Database cannot be established", err)
    })

