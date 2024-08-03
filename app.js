/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
const PORT  = 6301;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./db-connector')

// Serve static files from the 'public_html' directory
app.use(express.static(__dirname + '/public_html'));

/*
    ROUTES
*/
// Default route for the homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public_html/index.html');
});

/*
    LISTENER
*/
app.listen(PORT, () => {
    console.log(`Express server started on http://localhost:${PORT}; press Ctrl-C to terminate.`);
});
