/*
Names : Abdulelah Alanazi - Mei Murakami -  Anthony Prudent
DESC: This SQL script manipulates data in a sports management database. 
*/

/*
Manipulates data in the Events table
*/

-- Display the content of the Events table
SELECT Events.EventID, Events.Name, Events.Date, Venues.Name AS Venue, Sports.Name AS Sport, Events.Score, Leagues.Name AS League, Events.TicketPrice
FROM Events
JOIN Venues ON Events.VenueID = Venues.VenueID
JOIN Sports ON Events.SportID = Sports.SportID
JOIN Leagues ON Events.LeagueID = Leagues.LeagueID;

-- Add a new event
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
    ~Name_Input,
    ~DateTime_Input,
    ~VenueID_Dropdown_Input,
    ~SportID_Dropdown_Input,
    Score_Input,
    ~LeagueID_Dropdown_Input,
    ~TicketPrice_Input
);

-- update event's data using the update event form (LeagueID can be updated to null)
UPDATE Events 
SET 
Name = ~Name_Input, 
Date= ~DateTime_Input, 
VenueID = ~VenueID_Dropdown_Input, 
SportID = ~SportID_Dropdown_Input, 
Score = ~Score_Input, 
LeagueID = ~LeagueID_Dropdown_Input, 
TicketPrice = ~TicketPrice_Input 
WHERE EventID= ~EventID_from_the_update_form

/*
Manipulates data in the CompetingTeams table
*/

-- Display the content of the CompetingTeams table
SELECT CompetingTeams.CompetingTeamID, Events.Name AS Event, Teams.Name as Team
FROM CompetingTeams
JOIN Events ON CompetingTeams.EventID = Events.EventID
JOIN Teams ON CompetingTeams.TeamID = Teams.TeamID;

-- Add a new competing team (M-to-M relationship addition)
INSERT INTO CompetingTeams (
    EventID,
    TeamID
)
VALUES
(
   EventID_Dropdown_Input,
    TeamID_Dropdown_Input
);

/*
Manipulates data in the Teams table
*/

-- Display the content of the Teams table
SELECT Teams.TeamID, Teams.Name, Teams.Coach, Sports.Name AS Sport
FROM Teams
JOIN Sports ON Teams.SportID = Sports.SportID;

-- Add a new team 
INSERT INTO Teams (
    Name, 
    Coach,
    SportID
)
VALUES
(
    ~Name_Input,
    ~Coach_Input,
    ~SportID_Dropdown_Input
);

/*
Manipulates data in the Players table
*/

-- Display the content of the Players table
SELECT Players.PlayerID, Players.Name, Players.Position, Teams.Name AS Team
FROM Players
JOIN Teams ON Players.TeamID = Teams.TeamID;

-- Search for and diplsay a player using the search bar 
SELECT Players.PlayerID, Players.Name, Players.Position, Teams.Name AS Team
FROM Players
JOIN Teams ON Players.TeamID = Teams.TeamID
WHERE Players.Name = ~Player_Name_Search_Input;

-- Add a new player
INSERT INTO Players (
    Name, 
    Position,
    TeamID
)
VALUES
(
    ~Name_Input,
    ~Position_Input,
    ~TeamID_Dropdown_Input
);

/*
Manipulates data in the EventStreams table
*/

-- Display the content of the EventStreams table 
SELECT EventStreams.EventStreamID, Events.Name AS Event, StreamingServices.Name as StreamingService
FROM EventStreams
JOIN Events ON EventStreams.EventID = Events.EventID
JOIN StreamingServices ON EventStreams.ServiceID = StreamingServices.ServiceID;

-- Add new streamed event (M-to-M relationship addition)
INSERT INTO EventStreams (
    EventID,
    ServiceID
)
VALUES
(
    ~EventID_Dropdown_Input,
    ~ServiceID_Dropdown_Input
);

-- update a streamed event's data using the update EventStreams form
UPDATE EventStreams SET EventID = ~EventID_Dropdown_Input, ServiceID= ~ServiceID_Dropdown_Input WHERE EventStreamID= ~EventStreamID_from_the_update_form

-- Dissociate a streaming service from an event (M-to-M relationship deletion)
DELETE FROM EventStreams WHERE EventStreamID = ~EventStreamID_selected_from_EventStream_page

/*
Manipulates data in the StreamingServices table
*/

-- Display the content of the StreamingServices table
SELECT * FROM StreamingServices;

-- Add a new streaming service
INSERT INTO StreamingServices (
    Name, 
    Description
)
VALUES
(
    ~Name_Input,
    ~Description_Input
);

/*
Manipulates data in the Venues table
*/

-- Display the content of the Venues table
SELECT * FROM Venues;

-- Add a new venue
INSERT INTO Venues (
    Name, 
    Country,
    State,
    City,
    Capacity
)
VALUES
(
    ~Name_Input,
    ~Country_Input,
    ~State_Input,
    ~City_Input,
    ~Capacity_Input
);

/*
Manipulates data in the Leagues table
*/

-- Display the content of the Leagues table
SELECT Leagues.LeagueID, Leagues.Name, Leagues.YearFounded, Leagues.Commisioner, Sports.Name AS Sport
FROM Leagues
JOIN Sports ON Leagues.SportID = Sports.SportID;

-- Add a new league
INSERT INTO Leagues (
    Name, 
    YearFounded,
    Commisioner,
    SportID
)
VALUES
(
    ~Name_Input,
    ~YearFounded_Input,
    ~Comissioner_Input,
    ~SportID_Dropdown_Input
);

/*
Manipulates data in the Sports table
*/

-- Display the content of the Sports table
SELECT * FROM Sports;

-- Add a mew sport
INSERT INTO Sports (
    Name, 
    RulesManual,
    Description
)
VALUES
(
    ~Name_Input,
    ~RulesManual_Input,
    ~Description_Input
);
