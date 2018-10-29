require("dotenv").config();

var keys = require("../LIRI/keys");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// var spotifyInput1 = process.argv[2];
var request = require("request");

// var queryUrl = "https://api.spotify.com&apikey=" + spotify;

// console.log(queryUrl);

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  console.log("after data");
  });

//   spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });

