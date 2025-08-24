const jwt = require('jsonwebtoken');
const User = require('../models/user')

const userAuth = async (req, resp, next) => {

    try {
        //read the token from the req cookies
        const {token} = req.cookies;
        if(!token) {
            return resp.status(401).send("Please Login")
        }

        //validate the token
        const decodedData = await jwt.verify(token, "Nali@devtinder$123", {
            expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
        })

        const { _id } = decodedData;
        //find the user
        const user = await User.findById(_id);
        if(!user) {
            throw new error("User not found")
        }

        req.user = user;
        next()
    }catch(err) {
        resp.status(400).send("ERROR: " + err.message)
    }
    
}

module.exports = {userAuth}