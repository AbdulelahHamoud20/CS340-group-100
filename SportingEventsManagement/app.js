/*
Citation for the following JavaScript code:
Date: 8/9/2024
Copied from /OR/ Adapted from /OR/ Based on
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 
Added roots to the original code based on the sporting event database.
*/

// App.js

/*
    SETUP
*/

// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 53081;                // Set a port number at the top so it's easy to change in the future

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/

app.get('/', function(req, res)
{
    res.render('index')
});

// Events
app.get('/events', function(req, res)
{
    // Define our queries
    let selectVenuesQuery =
    `
    SELECT * FROM Venues;
    ` 

    let selectSportsQuery =
    `
    SELECT * FROM Sports;
    `

    let selectLeaguesQuery =
    `
    SELECT * FROM Leagues;
    `

    let selectEventsQuery = 
    `
    SELECT Events.EventID, Events.Name, Events.Date, Venues.Name AS Venue, Sports.Name AS Sport, Events.Score, Leagues.Name AS League, Events.TicketPrice
    FROM Events
    JOIN Venues ON Events.VenueID = Venues.VenueID
    JOIN Sports ON Events.SportID = Sports.SportID
    JOIN Leagues ON Events.LeagueID = Leagues.LeagueID
    ORDER BY EventID ASC;
    `;

    // Execute the queries
    db.pool.query(selectEventsQuery, function(error, rows, fields){
        
        // Saves the data from query
        let events = rows;
        
        // Run the another query after first
        db.pool.query(selectVenuesQuery, (error, rows, fields) => {
            
            let venues = rows

            db.pool.query(selectSportsQuery, (error, rows, fields) => {
            
                let sports = rows

                db.pool.query(selectLeaguesQuery, (error, rows, fields) => {
                    
                    let leagues = rows

                    // Render the index.hbs file, and also send the renderer
                    // an object where 'data' is equal to the 'rows' we
                    // received back from the query
                    return res.render('events', {data: events, venues: venues, sports: sports, leagues: leagues});  
                })                                                                
            })                                                                  
        })   
    })                                                                                               
});                                            

app.post('/add-event-ajax', function(req, res) 
{
    
    let data = req.body;

    // Create the query and run it on the database
    createQuery = 
    `
    INSERT INTO Events (
        Name, 
        Date,
        VenueID,
        SportID,
        Score,
        LeagueID,
        TicketPrice
    )
    VALUES
    (
        "${data.name}",
        "${data.date}",
        ${data.venue},
        ${data.sport},
        "${data.score}",
        ${data.league},
        ${data.ticketPrice}
    );
    `;

    db.pool.query(createQuery, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
            
        }

        else
        {
            // If there was no error, perform a SELECT
            selectQuery = 
            `
            SELECT Events.EventID, Events.Name, Events.Date, Venues.Name AS Venue, Sports.Name AS Sport, Events.Score, Leagues.Name AS League, Events.TicketPrice
            FROM Events
            JOIN Venues ON Events.VenueID = Venues.VenueID
            JOIN Sports ON Events.SportID = Sports.SportID
            JOIN Leagues ON Events.LeagueID = Leagues.LeagueID
            ORDER BY EventID ASC;
            `;

            db.pool.query(selectQuery, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-event-ajax/', function(req, res, next)
{
    let data = req.body;
    let EventID = parseInt(data.id);
    let deleteEventQuery = `DELETE FROM Events WHERE EventID = ?`;
    let deleteEventStreamsQuery = `DELETE FROM EventStreams WHERE EventID = ?`;
    let deleteCompetingTeamsQuery = `DELETE FROM CompetingTeams WHERE EventID = ?`;
  
  
    // Run the 1st query
    db.pool.query(deleteCompetingTeamsQuery, [EventID], function(error, rows, fields){
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }

        else
        {
            // Run the 2nd query
            db.pool.query(deleteEventStreamsQuery, [EventID], function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } 
                
                else 
                {
                    // Run the 3rd query
                    db.pool.query(deleteEventQuery, [EventID], function(error, rows, fields) {

                        if (error) {
                            console.log(error)
                            res.sendStatus(400)
                        }

                        else
                        {
                            res.sendStatus(204);
                        }
                    })
                }
            })
        }
    })
});

app.put('/put-event-ajax', function(req, res, next)
{
    let data = req.body;
  
    let eventid = data.eventid;
    let name = data.name;
    let date = data.date;
    let venue = data.venue;
    let sport = data.sport;
    let score = data.score;
    let league = data.league;
    let ticketprice = data.ticketprice;
  
    let queryUpdateEvent = 
    `
    UPDATE Events 
    SET 
    Name = ?, 
    Date= ?, 
    VenueID = ?, 
    SportID = ?, 
    Score = ?, 
    LeagueID = ?, 
    TicketPrice = ? 
    WHERE EventID= ?
    `;
    let selectEventsQuery = 
    `
    SELECT Events.EventID, Events.Name, Events.Date, Venues.Name AS Venue, Sports.Name AS Sport, Events.Score, Leagues.Name AS League, Events.TicketPrice
    FROM Events
    JOIN Venues ON Events.VenueID = Venues.VenueID
    JOIN Sports ON Events.SportID = Sports.SportID
    JOIN Leagues ON Events.LeagueID = Leagues.LeagueID
    WHERE EventID = ?
    `;
  
    // Run the 1st query
    db.pool.query(queryUpdateEvent, [name, date, venue, sport, score, league, ticketprice, eventid], function(error, rows, fields){
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }

        else
        { 
            // Run the 2nd query
            db.pool.query(selectEventsQuery, [eventid], function(error, rows, fields){
                if (error) {
        
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }

                else
                {   
                    res.send({rows});
                }
            })
        }
    })
});

// Leagues
app.get('/leagues', function(req, res)
{
    // Define our queries

    let selectSportsQuery =
    `
    SELECT * FROM Sports;
    `

    let selectLeaguesQuery = 
    `
    SELECT Leagues.LeagueID, Leagues.Name, Leagues.YearFounded, Leagues.Commisioner, Sports.Name AS Sport
    FROM Leagues
    JOIN Sports ON Leagues.SportID = Sports.SportID
    ORDER BY LeagueID ASC;
    `;

    // Execute the queries
    db.pool.query(selectLeaguesQuery, function(error, rows, fields){
        
        // Saves the data from query
        let leagues = rows;
        
        // Run the another query after first

        db.pool.query(selectSportsQuery, (error, rows, fields) => {
            
            let sports = rows

            // Render the index.hbs file, and also send the renderer
            // an object where 'data' is equal to the 'rows' we
            // received back from the query
            return res.render('leagues', {data: leagues, sports: sports});                                                                                                                                   
        })   
    })                                                                                               
}); 

app.post('/add-league-ajax', function(req, res) 
{
    
    let data = req.body;

    // Create the query and run it on the database
    createQuery = 
    `
    INSERT INTO Leagues (
        Name, 
        YearFounded,
        Commisioner,
        SportID
    )
    VALUES
    (
        "${data.name}",
        ${data.yearFounded},
        "${data.commisioner}",
        ${data.sport}
    );
    `;

    db.pool.query(createQuery, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
            
        }

        else
        {
            // If there was no error, perform a SELECT
            selectQuery = 
            `
            SELECT Leagues.LeagueID, Leagues.Name, Leagues.YearFounded, Leagues.Commisioner, Sports.Name AS Sport
            FROM Leagues
            JOIN Sports ON Leagues.SportID = Sports.SportID
            ORDER BY LeagueID ASC;
            `;

            db.pool.query(selectQuery, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-league-ajax/', function(req, res, next)
{
    let data = req.body;
    let LeagueID = parseInt(data.id);
    let deleteLeagueQuery = `DELETE FROM Leagues WHERE LeagueID = ?`;
  
    // Run the 1st query
    db.pool.query(deleteLeagueQuery, [LeagueID], function(error, rows, fields){
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }

        else
        {
            res.sendStatus(204);
        }
    })
});

app.put('/put-league-ajax', function(req, res, next)
{
    let data = req.body;
  
    let leagueid = data.leagueid;
    let name = data.name;
    let yearfounded = data.yearfounded;
    let commisioner = data.commisioner;
    let sport = data.sport;
  
    let queryUpdateLeague = 
    `
    UPDATE Leagues 
    SET 
    Name = ?, 
    YearFounded = ?, 
    Commisioner = ?, 
    SportID = ? 
    WHERE LeagueID = ?;
    `;
    let selectLeaguesQuery = 
    `
    SELECT Leagues.LeagueID, Leagues.Name, Leagues.YearFounded, Leagues.Commisioner, Sports.Name AS Sport
    FROM Leagues
    JOIN Sports ON Leagues.SportID = Sports.SportID
    WHERE LeagueID = ?;
    `;
  
    // Run the 1st query
    db.pool.query(queryUpdateLeague, [name, yearfounded, commisioner, sport, leagueid], function(error, rows, fields){
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }

        else
        { 
            // Run the 2nd query
            db.pool.query(selectLeaguesQuery, [leagueid], function(error, rows, fields){
                if (error) {
        
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }

                else
                {   
                    res.send({rows});
                }
            })
        }
    })
});

/*
    LISTENER
*/

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});