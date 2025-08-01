const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect(
        "mongodb+srv://nagarajunnr341:CrGZqjl1pvQop79Y@nalin-mongodb.oxqsbkw.mongodb.net/nalin-devTinder"
    );
};

module.exports = {connectDB}

