const express = require('express');

const app = express();

const {adminAuth, userAuth} = require('./middlewares/auth')

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

//Handle Auth Middlewalre for almost all the request
app.use("/admin", adminAuth)

app.get("/admin/getAllData", (req, resp) => {
    // Logic of checking if the request is authorized or not
    resp.send("All Data Sent");
})


app.get("/admin/deleteUser", (req, resp) => {
    // Logic of checking if the request is authorized or not
    resp.send("Deleted a User")
})

app.get("/test", userAuth, (req, resp) => {
    // Logic of checking if the request is authorized or not
    resp.send("Get the user details")
})

app.post("/user/login", (req, resp) => {
    resp.send("User Logged in Successfully")
})


app.listen(1818, () => {
    console.log('Server is successfully created on 1818 port....')
})
