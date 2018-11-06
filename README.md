# LIRI

This project is a simplified version of Siri that is used to search for songs on spotify,
search bandsintown for concerts, and search omdb for movie info.  I included appending the 
search results to a log file, as well as reading from random.txt and performing the 
normal functionality.

Spotify Search

node liri.js spotify "song title" (in quotes if more than one word)

OMDB Search

node liri.js movie-this "movie title" (in quotes if more than one word)

Bands In Town Search

node liri.js concert-this "artist name" (in quotes if more than one word)

Functionality also includes default searches should the song, movie or artist name be blank