'use strict';

var _getTwitterFollowers = require('get-twitter-followers');

var _getTwitterFollowers2 = _interopRequireDefault(_getTwitterFollowers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tokens = {
  consumer_key: 'ZvEeE9bPzB5zUNnKTswDnE89O',
  consumer_secret: '7LXITSlqsMp85A57Ew01rkTYEi8BlmVS1MjMqc4xm2TIASNJ1W',
  access_token: '26578369-134LZipIGTRYcI4QMOo63QZ0UeCVkP4m9BxO9tcNj',
  access_token_secret: 'PQV6WdA8zUncEX7H4LUABQohi54fRTVlEL1IfsuJAH4sf'
}; /* jshint esversion: 6 */

var username = 'skilfullycurled';

(0, _getTwitterFollowers2.default)(tokens, username).then(function (data) {

  var user = {};
  user.screen_name = username;
  user.followers = [];

  data.forEach(function(follower) {

    user.followers.push({screen_name : follower.screen_name, followers_count: follower.followers_count});

    // console.log(follower.screen_name);

  })

  console.log(user);

});
