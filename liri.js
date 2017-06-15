// requires
const fs = require('fs')

// twitter
const keys = require('./keys.js');
var Twitter = require('twitter');

// omdb
const request = require('request');

// grab the data from keys.js
fs.readFile('keys.js', 'utf8', function (error, fileContents) {
  if (error) {
    console.error(error)
  }
})

// store the keys in a variable.
var keyList = keys.twitterKeys;

// twitter npm keys
var client = new Twitter({

  consumer_key: keyList.consumer_key,
  consumer_secret: keyList.consumer_secret,
  access_token_key: keyList.access_token_key,
  access_token_secret: keyList.access_token_secret

});

// vars to grab user inputs
//movie-this or twitter
var userFunction = process.argv[2];

//movie name
var userRequest = process.argv[3];

//movie URLs
var movieURL = 'http://www.omdbapi.com/?apikey=40e9cece&t=' + userRequest;
var mrNobody = 'http://www.omdbapi.com/?apikey=40e9cece&t=mr.nobody';


//if user types my-tweets
if (userFunction === 'my-tweets') {

    //get screen name
    var params = {screen_name: 'bridgetbootcamp'};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (!error) {

          //loop through tweets array
           for(i=0;i<tweets.length;i++) {

             //console.log tweets & creation date
             console.log(tweets[i].text)
             console.log(tweets[i].created_at)
           }
  }
});
}

//if user types movie-this
else if (userFunction === 'movie-this') {

  //request movieURL
  request(movieURL, function (error, response, body) {

    //parse JSON object
     const json = JSON.parse(body);

      //console log info
       console.log(json.Title)
       console.log(json.Year)
       console.log(json.imdbRating)
       console.log(json.Country)
       console.log(json.Language)
       console.log(json.Plot)
       console.log(json.Actors)
       console.log(json.Ratings[1])
  });
}

//if user types do-what-it-says
else if  (userFunction === 'do-what-it-says') {

  fs.readFile('random.txt', 'utf8', function (error, fileContents) {
    if (error) {
      console.error(error)
    }
      console.log(fileContents)
  })
}
