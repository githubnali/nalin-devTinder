const express = require('express');

const app = express();

const {adminAuth, userAuth} = require('./middlewares/auth')

app.get("/getUserData", (req, resp) => {
    try {

        throw new Error("jwdclealiabe");
        resp.send("User Data Sent")
    } catch (err) {
        resp.status(500).send("Something went wrong")
    }
}) 

app.use("/", (err, req, resp, next) => {
    if(err) {
        resp.status(500).send("Something went wrong");
    }
})


app.listen(1818, () => {
    console.log('Server is successfully created on 1818 port....')
})
