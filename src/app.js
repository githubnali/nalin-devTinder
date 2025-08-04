const express = require('express');
const bcrypt = require('bcrypt');

const {connectDB} =  require("./config/database");

const app = express();

const User = require('./models/user');
const user = require('./models/user');

const validator = require('validator')

const {validateSignupData} = require('./utils/validation')

//converts the JSON data into JS Obj
app.use(express.json())

app.post("/signup", async (req, resp) => {

    try {

        //Validation of data
        validateSignupData(req)

        const {password, firstName, lastName, emailId} = req.body

        //Encrypting the password
        const passwordHash = await bcrypt.hash(password, 10)
        console.log(passwordHash);

        // passing user data dynamically from an API
        const user = new User(
            {
                firstName, 
                lastName, 
                emailId, 
                password: passwordHash
            }
        )

        await user.save();
        resp.send("User Added Successfully");
    } catch(err) {
        resp.status(400).send("ERROR: " + err.message);
    }
})

app.post("/login", async(req, resp) => {
    try {
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId});

        if(!validator.isEmail(emailId)) {
            throw new Error("Please enter a valid email address: ", emailId)
        }

        if(!user) {
            throw new Error("Invalid Credentials")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid) {
            resp.send("User logged in successfully")
        }else {
            throw new Error("Invalid Credentials")
        }

    }catch(err) {
        resp.status(400).send("ERROR: " + err.message);
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

