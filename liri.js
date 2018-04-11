require("dotenv").config();

var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

console.log(keys.spotify);
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var parameters = { name: 'Ztrip2', count:20};



function MyTweets(){  //show last 20 tweets and when they were created in terminal
    client.get('statuses/user_timeline',parameters, function(error, tweets, response){
        if (!error){
            for (var i = 0; i < tweets.length; i++){
                console.log('Tweet: ' + tweets[i].text + '\nCreated: ' + tweets[i].created_at);
            }
        }
    });
};

function SpotifySearch(){
    var spotifyArgs = process.argv;
    var song = spotifyArgs[3];

    if (song){spotify.search({type: 'track', query: '' + song + ''}, function(err, data){
        if (err){
            return console.log('Spotify Error: ' + err);
        }
            // console.log('JSON: ', JSON.stringify(data, null));
            console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            console.log('Song Name: ' + data.tracks.items[0].name);
            console.log('Preview: ' + data.tracks.items[0].preview_url);
            console.log('Album: ' + data.tracks.items[0].album.name);
    });
    } else { // if no song is enterd the default song is "The Sign"
         spotify.search({ type: 'track', query: 'the+sign'}, function(err, data) {
             if (err){
                 return console.log('Spotify Error: ' + err);
             }
             Console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            console.log('Song Name: ' + data.tracks.items[0].name);
            console.log('Preview: ' + data.tracks.items[3].preview_url);
            console.log('Album: ' + data.tracks.items[0].album.name);
         });   
    }

    //artist
    //song name
    //preview link of the song from spotify
    //the album it's from
    //if no song is provided it will default to "the sign by Ace of Base"
}


function Movie(){
    var movieArgs = process.argv;
    var movie = movieArgs[3];
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    var noInput = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy"
    if (movie){
        request(queryUrl, function(error, response, body){
            if (!error && response.statusCode === 200) {
                console.log('No Error and Request Works');

                console.log('Title: ' + JSON.parse(body).Title);
                console.log('Year: ' + JSON.parse(body).Year);
                console.log('IMDB Raiting: ' + JSON.parse(body).imdbRating);
                console.log('Rotten Tomatoes Rating:' + JSON.parse(body).Ratings[1].Value);
                console.log('Production Country: ' + JSON.parse(body).Country);
                console.log('Language: ' + JSON.parse(body).Language);
                console.log('Plot: ' + JSON.parse(body).Plot);
                console.log('Actors: ' + JSON.parse(body).Actors);
            }
        });
    } else {
        request(noInput, function(error, response, body){
            if (!error && response.statusCode ===200) {
                console.log('No Error and Mr Nobody')
                
                console.log('Title: ' + JSON.parse(body).Title);
                console.log('Year: ' + JSON.parse(body).Year);
                console.log('IMDB Raiting: ' + JSON.parse(body).imdbRating);
                console.log('Rotten Tomatoes Rating:' + JSON.parse(body).Ratings[1].Value);
                console.log('Production Country: ' + JSON.parse(body).Country);
                console.log('Language: ' + JSON.parse(body).Language);
                console.log('Plot: ' + JSON.parse(body).Plot);
                console.log('Actors: ' + JSON.parse(body).Actors);

                //    * Title of the movie.
    //    * Year the movie came out.
    //    * IMDB Rating of the movie.
    //    * Rotten Tomatoes Rating of the movie.
    //    * Country where the movie was produced.
    //    * Language of the movie.
    //    * Plot of the movie.
    //    * Actors in the movie.
            }
        });
    }
    
    

    // If the user doesn't type in a movie it will output the data for Mr. Nobody
}

function doWhat() {
    fs.readFile('random.txt', "UTF-8", function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
  
        var dataArr = data.split(',');
        command = dataArr[0];
        search = dataArr[1];
  
        if (command === 'spotify-this-song') {
          SpotifySearch(search);
        } else if (command === 'movie-this') {
          Movie(search);
        } else if (command === 'my-tweets') {
          MyTweets();
        } else {
          console.log('Enter valid command');
        }
        /*
        switch(command) {
            case 'spotify':
            case 'song-search':
            case 'spotify-this-song':
                askSpotify(search);
                break;

            case 'movie-this':
            case 'movies':
                askOMDB(search)
                break;

            case 'my-tweets':
                myTweets()
                break;
            
            default:
                console.log('Invalid command.')
        }
        */
      }
    });
  }
  
  var command = process.argv[2];

  if (command ==='do-what-it-says') {
    doWhat();
  } else if (command === 'my-tweets') {
    MyTweets();
  } else if (command === 'spotify-this-song') {
    SpotifySearch(process.argv[3]);
  } else if (command === 'movie-this') {
    Movie(process.argv[3]);
  } else {
    console.log('Enter valid command');
  }
    //In addition to loggin the data in Bash, output data to a .txt file called log.txt
    //Make sure to append each command to the log.txt file
    //don't overwrite each command

