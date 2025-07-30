const express = require('express');

const app = express();

//regular expression with /a/ or /.*fly$/
app.get(/.*rot$/, (req, resp) => {
    resp.send({
        "first_name": 'nagaraju nali',
        "last_name": 'nali'
    });
})

// general routing using query parameters /user?un=nagaraju&pw=testing
app.get("/user", (req, resp) => {
    console.log(req.query)
    resp.send('data sent')
})

// dynamic routing accesing through req.parameters
app.get("/user/:userId", (req, resp) => {
    console.log(req.params);

    resp.send('get the user id as num')
})


app.listen(1818, () => {
    console.log('Server is successfully created on 1818 port....')
})
