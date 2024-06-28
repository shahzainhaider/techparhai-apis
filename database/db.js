const mongoose = require('mongoose');

const mongoURL = "mongodb://localhost:27017/myProject";

const connectToMongo = () => {
    // Check if the connection is already established
    if (mongoose.connection.readyState === 1) {
        console.log('Already connected to MongoDB');
        return;
    }

    mongoose.connect(mongoURL)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = connectToMongo;
