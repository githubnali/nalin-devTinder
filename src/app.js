const express = require('express');

const app = express();

app.use("/about", (req, resp) => {
    resp.send('about Hello From server.....');
})

app.use("/contact", (req, resp) => {
    resp.send("contact page");
})

app.use("/", (req, resp) => {
    resp.send('Hello Namaste Nagaraju Nali');
})

app.listen(1818, () => {
    console.log('Server is successfully created on 1818 port....')
})
