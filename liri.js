require("dotenv").config();

var keys = require('./keys.js');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var parameters = { name: 'Ztrip2', count:20};



function MyTweets(){  //show last 20 tweets and when they were created in terminal
    client.get('statuses/user_timeline',parameters, function(error, tweets, response){
        if (!error){
            for (var i = 0; i , tweets.lenghth; i++){
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
            Console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            consloe.log('Song Name: ' + data.tracks.items[0].name);
            console.log('Preview: ' + data.tracks.items[0].preview_url);
            consloe.log('Album: ' + data.tracks.items[0].album.name);
    });
    } else { // if no song is enterd the default song is "The Sign"
         spotify.search({ type: 'track', query: 'the+sign'}, function(err, data) {
             if (err){
                 return console.log('Spotify Error: ' + err);
             }
             Console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            consloe.log('Song Name: ' + data.tracks.items[0].name);
            console.log('Preview: ' + data.tracks.items[3].preview_url);
            consloe.log('Album: ' + data.tracks.items[0].album.name);
         });   
    }

    //artist
    //song name
    //preview link of the song from spotify
    //the album it's from
    //if no song is provided it will default to "the sign by Ace of Base"
}


function movie(){
    //    * Title of the movie.
    //    * Year the movie came out.
    //    * IMDB Rating of the movie.
    //    * Rotten Tomatoes Rating of the movie.
    //    * Country where the movie was produced.
    //    * Language of the movie.
    //    * Plot of the movie.
    //    * Actors in the movie.

    // If the user doesn't type in a movie it will output the data for Mr. Nobody
}

function WhatItSays(){
    //In addition to loggin the data in Bash, output data to a .txt file called log.txt
    //Make sure to append each command to the log.txt file
    //don't overwrite each command
}
