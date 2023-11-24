// IMPORTS
// initializing the express router object
const express = require('express');
// connection to initiate the mongoose connection
const connection = require('./config/connection');
// connecting to the routes
const routes = require('./routes');

// assigns the current working directory
const cwd = process.cwd();
console.log(cwd);

// Initializes the express application
const app = express();
// Setting the port
const PORT = process.env.PORT || 3001;

// Parsing the JSON data
app.use(express.json());
// Parsing the URL-encoded data
app.use(express.urlencoded({ extended: true }));
// Mounting the routes
app.use(routes);

// Establishing the connection using mongoose
connection.once('open', () => {
    // Starting the server, listening for incoming requests on the specified port
    app.listen(PORT, () => {
        console.log(`Server is now running at 🚀 http://localhost:${PORT} 🚀`);
    });
});