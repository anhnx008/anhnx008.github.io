require("dotenv").config();

//Get the neccessary libraries
var keys = require('./keys');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require('fs');
var request = require('request');

//Get keys for both spotify and twitter
var spotifyClient = new Spotify(keys.spotify);
var twitterClient = new Twitter(keys.twitter);

var userInputValue = "";
var logInput = "";
var command = process.argv[2];
var inputArgs = process.argv;

//Get user's input after the command
for (var i = 3; i < inputArgs.length; i++) {

    if (i > 3 && i < inputArgs.length) {
        userInputValue = userInputValue + "+" + inputArgs[i];
        logInput = logInput + " " + inputArgs[i];
    } 
    else { 
        userInputValue += inputArgs[i];
        logInput += inputArgs[i];  
    }
  }

var commandAndValue = command + " " + logInput + "\r\n";

//Log the inputARgs to a text file
fs.appendFile("log.txt", commandAndValue, function(error)
{
    if (error) {
        return console.log(error);
      }
});

//Get tweets from twitter
function getTweets() {
    var count = 1;
    twitterClient.get('statuses/user_timeline', {count:20}, function (error, data) {
        if (error) throw error;

        console.log("Your tweets are: \n");

        for (var i = 0; i < data.length; i++) {
            console.log(count + ". " + data[i].text);
            count++;
        }
    });
}

//Get movie info from omdb
function getMovieInfo(userinput) {
    var movieTitle = userinput;

    if(movieTitle === "")
    {
        movieTitle = "Mr. Nobody";
    }

    var queryURL = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

    request(queryURL, function(error, response, body){

        if(!error && response.statusCode === 200){
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Taing of the movie: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country where movie was produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot of movie: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
        else{
            console.log("Error: " + error);
        }
    })
}

//Get song info from spotify
function getSongInfo(userinput){

    var songTitle = userinput;

    if(songTitle === "")
    {
        songTitle = "The Sign";
    }

    spotifyClient.search({type: 'track', query: songTitle}
    ).then(function(response){          
           console.log("Artists: " + response.tracks.items[0].artists[0].name);
           console.log("Song's name: " + response.tracks.items[1].name);
           console.log("Preview link: " + response.tracks.items[1].preview_url);
           console.log("Album: " + response.tracks.items[1].album.name);
    });
}

//Read command from file
function getCommandFromFile()
{
    fs.readFile("random.txt", "utf8", function(error, data){

        if(error)
        {
            console.log(error);
        }
        var command= data.substr(0, data.indexOf(',')); 
        var values = data.substr(data.indexOf(',') + 1);

        if(command === "spotify-this-song")
        {
            getSongInfo(values);
        }
    });
}

//Post a tweet
function postTweet(userinput)
{
    twitterClient.post('statuses/update', { status: userinput }, function (error, tweet) {
        if (error) throw error;
    });     
}

//Execute the specified command
if (command === "my-tweets") {
    getTweets();
}
else if(command === "spotify-this-song")
{
    getSongInfo(userInputValue);
}
else if(command === "movie-this")
{
    getMovieInfo(userInputValue);
}
else if(command === "do-what-it-says")
{
    getCommandFromFile();
}
else if(command === "post-tweet")
{
    postTweet(logInput);
}
else{
    console.log("I'm sorry, I don't understand that command.");
    console.log("Supported commands are: \r\n");
    console.log("my-tweets");
    console.log("spotify-this-song <song name here>");
    console.log("movie-this <your movie");
    console.log("do-what-it-says");
    console.log("post-tweet <your tweet>");
}


