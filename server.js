/* jshint esversion: 6 */

// libs
var randomstring = require('randomstring');
var getFollowers = require('get-twitter-followers');
var stopwatch = require('timer-stopwatch');

// servi.js adapted from https://github.com/robynitp/networkedmedia
var fs = require('fs');
var servi = require('servi');

var app = new servi(true);

// set port (defaults to 3000)
port(3333);

// databases
// looks for file called "data/graphs.db" or creates one if it does not exist
var graphs = useDatabase('data/graphs');

// routing
route('/angiograph', home);
route('/angiograph/register', register);
route('/angiograph/view/:gid');

function register(req){

  // unique id for the hashtag
  var uid = randomstring.generate({length: 7, readable: true, capitalization: 'uppercase'});

  var handle = req.params.handle; // twitter handle
  var tracer = 'CID2140_' + tid; // tracer hashtag e.g. CID2140_A79IQB4

  graph.add({tid: tracer, user: handle});
  req.respond('Registered a graph for ' + handle + ' with the hashtag ' + tracer + '.');

}

function viewPeople(request) {

  var gid = request.params.gid;

  graphs.find({'gid' : gid}, function(err, data){
    request.render('templates/argraph.html', {graph : data});
  });

}


// routes
function home(req){
  console.log('Requesting homepage...');
  req.respond('Welcome to the Angiograph!');
}

// make it so!
start();


// timers

var postCountdown = 43200000;
var removeCountdown = 300000;
var getFollowersCoundown = 43200000;

var postTimer = new Stopwatch(postCountdown);
var removeTimer = new Stopwatch(removeCountdown);
var getFollowersTimer = new Stopwatch(getFollowersCoundown);


postTimer.onDone(function(){
  postTweet(tweetID);
  removeTimer.start();
  postTimer.reset(postCountdown);
});

removeTimer.onDone(function(){
  postTimer.stop();
  removeTweet(tweetID);
});

//TODO


function createGraph(followers){

  for (var i = 0; i < folowers.length; i++) {
      cy.add({
          data: { id: 'node' + i }
          }
      );
      var source = 'node' + i;
      cy.add({
          data: {
              id: 'edge' + i,
              source: source,
              target: (i % 2 === 0 ? 'a' : 'b')
          }
      });
  }
}
