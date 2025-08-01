const express = require('express');

const {connectDB} =  require("./config/database");

const app = express();

const User = require('./models/user')

app.post("/signup", async (req, resp) => {
    const userObj = {
        firstName: 'Uma Mahesh',
        lastName: 'Onteru',
        emailId: 'uma1@gmail.com',
        password: 'Uma@122'
    }

    try {
        // creating a new instance of the user model
        const user = new User(userObj)
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

