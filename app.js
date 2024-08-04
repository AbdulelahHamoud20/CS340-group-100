/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 6301;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./db-connector');

/*
    ROUTES
*/

app.get('/', function(req, res) {
    // Define queries for each table
    let queries = {
        events: `
            SELECT Events.EventID, Events.Name, Events.Date, Venues.Name AS Venue, Sports.Name AS Sport, Events.Score, Leagues.Name AS League, Events.TicketPrice
            FROM Events
            JOIN Venues ON Events.VenueID = Venues.VenueID
            JOIN Sports ON Events.SportID = Sports.SportID
            JOIN Leagues ON Events.LeagueID = Leagues.LeagueID;`,
        leagues: `
            SELECT Leagues.LeagueID, Leagues.Name, Leagues.YearFounded, Leagues.Commisioner, Sports.Name AS Sport
            FROM Leagues
            JOIN Sports ON Leagues.SportID = Sports.SportID;`,
        teams: `
            SELECT Teams.TeamID, Teams.Name, Teams.Coach, Sports.Name AS Sport
            FROM Teams
            JOIN Sports ON Teams.SportID = Sports.SportID;`,
        competingTeams: `
            SELECT CompetingTeams.CompetingTeamID, Events.Name AS Event, Teams.Name AS Team
            FROM CompetingTeams
            JOIN Events ON CompetingTeams.EventID = Events.EventID
            JOIN Teams ON CompetingTeams.TeamID = Teams.TeamID;`,
        sports: 'SELECT * FROM Sports;',
        players: `
            SELECT Players.PlayerID, Players.Name, Players.Position, Teams.Name AS Team
            FROM Players
            JOIN Teams ON Players.TeamID = Teams.TeamID;`,
        venues: 'SELECT * FROM Venues;',
        streamingServices: 'SELECT * FROM StreamingServices;',
        eventStreams: `
            SELECT EventStreams.EventStreamID, Events.Name AS Event, StreamingServices.Name AS StreamingService
            FROM EventStreams
            JOIN Events ON EventStreams.EventID = Events.EventID
            JOIN StreamingServices ON EventStreams.StreamingServiceID = StreamingServices.StreamingServiceID;`
    };

    // Execute all queries
    let results = {};
    let queryPromises = Object.keys(queries).map(key => {
        return new Promise((resolve, reject) => {
            db.pool.query(queries[key], function(err, rows) {
                if (err) return reject(err);
                results[key] = rows;
                resolve();
            });
        });
    });

    // Once all queries are done
    Promise.all(queryPromises).then(() => {
        // Create HTML content dynamically
        let createTable = (tableName, headers, rows) => {
            let table = `<h2>${tableName}</h2><table><tr>`;
            headers.forEach(header => table += `<th>${header}</th>`);
            table += `</tr>`;
            rows.forEach(row => {
                table += `<tr>`;
                Object.values(row).forEach(value => table += `<td>${value}</td>`);
                table += `</tr>`;
            });
            table += `</table>`;
            return table;
        };

        let base = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dashboard</title>
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                table, th, td {
                    border: 1px solid black;
                }
                th, td {
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
                button {
                    margin: 10px 5px 10px 0;
                    padding: 10px 15px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
                button:hover {
                    opacity: 0.8;
                }
                .edit-btn {
                    background-color: #FFA500;
                }
                .delete-btn {
                    background-color: #f44336;
                }
                .form-container {
                    margin-top: 20px;
                }
                .search-container {
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
        <div class="nav">
            <a href="/">Homepage</a>
            <a href="/teams">Teams</a>
            <a href="/competingTeams">Competing Teams</a>
            <a href="/sports">Sports</a>
            <a href="/players">Players</a>
            <a href="/venues">Venues</a>
            <a href="/streamingServices">Streaming Services</a>
            <a href="/eventStreams">Event Streams</a>
        </div>
        `;

        // Generate table content
        let content = `
        ${createTable('Events', ['EventID', 'Name', 'Date', 'Venue', 'Sport', 'Score', 'League', 'TicketPrice'], results.events)}
        ${createTable('Leagues', ['LeagueID', 'Name', 'YearFounded', 'Commisioner', 'Sport'], results.leagues)}
        ${createTable('Teams', ['TeamID', 'Name', 'Coach', 'Sport'], results.teams)}
        ${createTable('Competing Teams', ['CompetingTeamID', 'Event', 'Team'], results.competingTeams)}
        ${createTable('Sports', ['SportID', 'Name', 'RulesManual', 'Description'], results.sports)}
        ${createTable('Players', ['PlayerID', 'Name', 'Position', 'Team'], results.players)}
        ${createTable('Venues', ['VenueID', 'Name', 'Country', 'State', 'City', 'Capacity'], results.venues)}
        ${createTable('Streaming Services', ['StreamingServiceID', 'Name', 'Description'], results.streamingServices)}
        ${createTable('Event Streams', ['EventStreamID', 'Event', 'StreamingService'], results.eventStreams)}
        `;

        // Complete HTML structure
        let footer = `
        </body>
        </html>
        `;

        // Send response
        res.send(base + content + footer);
    }).catch(err => {
        console.error(err);
        res.status(500).send("Error retrieving data.");
    });
});

/*
    LISTENER
*/
app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});
