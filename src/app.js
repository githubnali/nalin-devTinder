const express = require('express');

const {connectDB} =  require("./config/database");

const app = express();

const cookieParser = require('cookie-parser');


//converts the JSON data into JS Obj
app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth");
const profileRouter = require('./routes/profile');
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
    .then(() => {
        console.log("Database Connection Established.....")
        app.listen(1818, () => {
            console.log('Server is successfully created on 1818 port....')
        })
    }).catch((err) => {
        console.log("Database cannot be established", err)
    })

