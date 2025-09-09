const express = require('express');

const cors = require('cors')

const {connectDB} =  require("./config/database");

const app = express();

const cookieParser = require('cookie-parser');


require('dotenv').config();

require('./utils/cronJob');
//converts the JSON data into JS Obj
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth");
const profileRouter = require('./routes/profile');
const requestRouter = require("./routes/request");
const userRouter = require('./routes/user')

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
    .then(() => {
        console.log("Database Connection Established.....")
        app.listen(process.env.PORT, () => {
            console.log('Server is successfully created on 1818 port....')
        })
    }).catch((err) => {
        console.log("Database cannot be established", err)
    })

