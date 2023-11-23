// IMPORT the Mongoose library to use MongoDB
const mongoose = require('mongoose');

// Establishing the connection to the MongoDB database. Giving the option to use the default connection string. Added options to ensure compatibility with newer versions of MongoDB.
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetwork_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

// EXPORT the connection object. Allowing other modules in the application to access and interact with it.
module.exports = mongoose.connection;