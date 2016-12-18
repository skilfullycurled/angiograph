/* jshint esversion: 6 */

// import getTwitterFollowers from 'get-twitter-followers';

var randomstring = require('randomstring');

var Twit = require('twit');

var T = new Twit({
  consumer_key:        'ZvEeE9bPzB5zUNnKTswDnE89O',
  consumer_secret:     '7LXITSlqsMp85A57Ew01rkTYEi8BlmVS1MjMqc4xm2TIASNJ1W',
  access_token:        '26578369-134LZipIGTRYcI4QMOo63QZ0UeCVkP4m9BxO9tcNj',
  access_token_secret: 'PQV6WdA8zUncEX7H4LUABQohi54fRTVlEL1IfsuJAH4sf'
});


var servi = require('servi');
var app = new servi(true);
port(3334); // set port (defaults to 3000)
start();

var graphs = useDatabase('data/graphs'); // looks for file called "data/graphs.db" or creates one if it does not exist

var user_ids = ['26578369'];

user_ids.forEach(function(user_id){

  var graph = {};
  graph.nodes = [];
  graph.uid = user_id;

  T.get('followers/ids', { user_id: user_id },  function (err, data, response) {

    if(data.next_cursor_str === '0'){ //I only want users who have less than 5000 followers.

      var user = {}; //create a user
      user.user_id = user_id;
      user.followers = data.ids;

      graph.nodes.push(user);

      user.followers.forEach(function(follower_id) {

        T.get('followers/ids', { user_id: follower_id },  function (err, data, response) {

          if(data.next_cursor_str === '0'){ //I only want users who have less than 5000 followers.

            var user = {}; //create a user
            user.user_id = follower_id;
            user.followers = data.ids;

            graph.nodes.push(user);
          } else {
            console.log('greater than 5000');
          }
        });
      });

    } else {
      console.log('greater than 5000');
    }

  });

  graphs.add(graph);

});
