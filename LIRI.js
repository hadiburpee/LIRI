//requires the use of dotenv
require("dotenv").config();

var keys = require("../LIRI/keys");
var request = require("request");
var fs = require("fs");
var userType = 'track';
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var LIRI = process.argv[2];
var searchQuery = process.argv[3];
var spotifyObject;

//spotify search function
function spotifySearch(){
  console.log("Search Query: " + searchQuery);
  spotify.search({type: userType, query: searchQuery}, function(err, response){
  // original to write object to text for easy view
  // spotify.search({ type: 'track', query: searchQuery })
  //   .then(function(response) {
  //     fs.writeFile("spotify.txt", JSON.stringify(response, null, 3), 
  //     function(err){
        if(err){
          console.log("Error: " + err);
        }
        else{
          // console.log("Your file was written");
          spotifyObject = response.tracks.items[0];
          console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
          + "\n================================"
          + "\n"
          + "\nArtist: " + spotifyObject.artists[0].name
          + "\nSong: " + spotifyObject.name
          + "\nAlbum: " + spotifyObject.album.name          
          + "\nLink: " + spotifyObject.external_urls.spotify
          + "\n"
          + "\n================================"
          + "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        }
      });
}

function omdbSearch(){
    var queryUrl = "http://www.omdbapi.com/?t=" + searchQuery 
    + "&plot=short&apikey=trilogy";

    request(queryUrl, function(err, response, body){
      if(err && response.statusCode !== 200){
        console.log("Error: " + err);
      }
      else{
        var omdbObject = JSON.parse(body);

        console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
          + "\n================================"
          + "\nTitle: " + omdbObject.Title
          + "\nYear: " + omdbObject.Year
          + "\nIMDB Rating: " + omdbObject.Ratings[1].value
          + "\nCountry: " + omdbObject.Country
          + "\nLanguage: " + omdbObject.Language
          + "\nPlot: " + omdbObject.Plot
          + "\nStarring: " + omdbObject.Actors
          + "\n"
          + "\n================================"
          + "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      }
    });
}

//function calls
if(LIRI === "spotify"){
  if(searchQuery === undefined){
    searchQuery = "Ace of Base The Sign";
    spotifySearch();
  }
  else{
    spotifySearch();
  }
}
if(LIRI === "movie-this"){
  if(searchQuery === undefined){
    searchQuery = "Mr. Nobody";
    omdbSearch();
  }
  else{
    omdbSearch();
  }
}





