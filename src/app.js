const express = require('express');
const bcrypt = require('bcrypt');

const {connectDB} =  require("./config/database");

const app = express();

const User = require('./models/user');
const {userAuth} = require('./middlewares/auth')

const validator = require('validator');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken")

const {validateSignupData} = require('./utils/validation')

//converts the JSON data into JS Obj
app.use(express.json())
app.use(cookieParser())

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

app.post("/login" ,async(req, resp) => {
    try {
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId});

        if(!validator.isEmail(emailId)) {
            throw new Error("Please enter a valid email address: ", emailId)
        }

        if(!user) {
            throw new Error("Invalid Credentials")
        }

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid) {

            //Create a JWT Token
            const token = await user.getJWT()

            //Add the token to cookie and send the response back to the user
            resp.cookie("token", token)
            resp.send("User logged in successfully")
        }else {
            throw new Error("Invalid Credentials")
        }

    }catch(err) {
        resp.status(400).send("ERROR: " + err.message);
    }
})

app.get("/profile", userAuth, async(req, resp) => {

    try {

       const user = req.user;
       resp.send(user)

    }catch(err) {
        resp.status(400).send("ERROR: " + err.message);
    }
   
})

app.post("/sendingConnectionRequest", userAuth,  async(req, resp) => {

    const user = req.user;
    //sending a connection request
    console.log("Sending a connection request")

    resp.send(user.firstName + " sending the connection request")
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

