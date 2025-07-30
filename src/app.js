const express = require('express');

const app = express();

//app.use("/routes", rh1, [rh2, rh3], rh4, rh5)
app.use(
    "/user", 
    (req, resp, next) => {
        console.log("consolelog 1");
        next();
        resp.send("1 response");
    }, 
    (req, resp, next) => {
        console.log("consolelog 2");
        next()
        resp.send("2 response");
    },
    (req, resp, next) => {
        console.log("consolelog 3");
        next()
        resp.send("3 response");
    },
    (req, resp, next) => {
        console.log("consolelog 4");
        resp.send("4 response");
    }
)


app.listen(1818, () => {
    console.log('Server is successfully created on 1818 port....')
})
