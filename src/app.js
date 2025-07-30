const express = require('express');

const app = express();

app.get('/user', (req, resp) => {
    resp.send("get the user data successfully");
})

app.post('/user', (req, resp) => {
    resp.send("User data updated successfully")
})

app.put('/user', (req, resp) => {
    resp.send('updated previous user data completely')
})

app.patch("/user", (req, resp) => {
    resp.send("partial data of the user gets updated")
})

app.delete("/user", (req, resp) => {
    resp.send("User delete successfully")
})

app.use("/", (req, resp) => {
    resp.send('Hello Namaste Nagaraju Nali');
})

app.listen(1818, () => {
    console.log('Server is successfully created on 1818 port....')
})
