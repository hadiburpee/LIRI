//requires the use of dotenv
require("dotenv").config();

var keys = require("../LIRI/keys");
var request = require("request");
var moment = require("moment");
var fs = require("fs");
var userType = 'track';
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var LIRI = process.argv[2];
var searchQuery = process.argv[3];
var spotifyObject;
var omdbObject;
var bandsObject;

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
          var spotifyString = "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
          + "\n================================"
          + "\n"
          + "\nArtist: " + spotifyObject.artists[0].name
          + "\nSong: " + spotifyObject.name
          + "\nAlbum: " + spotifyObject.album.name          
          + "\nLink: " + spotifyObject.external_urls.spotify
          + "\n"
          + "\n================================"
          + "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
          fs.appendFile("log.txt", spotifyString, function(err){
            if(err){
              console.log(err);
            }
          })
          console.log(spotifyString);
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
        omdbObject = JSON.parse(body);

        var omdbString = "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
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
        + "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";
        fs.appendFile("log.txt", omdbString, function(err){
          if(err){
            console.log(err);
          }
        
        })
        console.log(omdbString);
      }
    });
}

function bandsintownSearch(){
  var queryUrl = "https://rest.bandsintown.com/artists/" 
  + searchQuery + "/events?app_id=codingbootcamp";

  request(queryUrl, function(err, response, body){
    if(err && response.statusCode !== 200){
      console.log("Error: " + err);
    }
    else{
      bandsObject = JSON.parse(body);
      // console.log(bandsObject);

      for(i=0; i < bandsObject.length; i++){
      var bandsString = "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
      + "\n================================"
      + "\n" + searchQuery + " Concert"
      + "\nVenue: " + bandsObject[i].venue.name
      + "\nVenue City: " + bandsObject[i].venue.city
      + "\nDate: " + moment(bandsObject[i].datetime).format("MM/DD/YYYY, h:mm a")
      + "\n"
      + "\n================================"
      + "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
      fs.appendFile("log.txt", bandsString, function(err){
        if(err){
          console.log(err);
        }
      })
      console.log(bandsString);
    }
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
if(LIRI === "concert-this"){
  if(searchQuery === undefined){
    searchQuery = "Metallica";
    bandsintownSearch();
  }
  else{
    bandsintownSearch();
  }
}
if(LIRI === "do-what-it-says"){
  fs.readFile("random.txt", "utf8", function(err, data){
    if(err){
      return console.log("Error: " + err);
    }
    else{
      var dataArr = data.split(",");
      var dataArr2 = dataArr[1].split(/\b/);
      var wordJoin = "";
      for(i=1;i<dataArr2.length-1; i++){
        wordJoin = wordJoin + dataArr2[i];
      }
      console.log(wordJoin);
      searchQuery = wordJoin;

    if(dataArr[0] === "spotify-this-song"){  
      spotifySearch();
    }
    else if (dataArr[0] === "concert-this"){
      bandsintownSearch();
    }
    else{
      omdbSearch();
    }
    }
  });
}





