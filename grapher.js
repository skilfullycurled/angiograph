var cytoscape = require('cytoscape');

var servi = require('servi');
var app = new servi(true);
port(3335); // set port (defaults to 3000)
start();

var graphs = useDatabase('data/graphs'); // looks for file called "data/graphs.db" or creates one if it does not exist

var graph_id = '26578369';

//from http://js.cytoscape.org/#layouts/cose
// options for the force directed graph layout
var options = {
  name: 'cose',


  ready: function(){}, // Called on `layoutready`
  stop: function(){}, // Called on `layoutstop`

  animate: false, // Whether to animate while running the layout
  randomize: true, // Randomize the initial positions of the nodes (true) or use existing positions (false)

  componentSpacing: 100, // Extra spacing between components in non-compound graphs
  nodeRepulsion: function( node ){ return 400000; }, // Node repulsion (non overlapping) multiplier
  nodeOverlap: 10, // Node repulsion (overlapping) multiplier

  idealEdgeLength: function( edge ){ return 10; }, // Ideal edge (non nested) length
  edgeElasticity: function( edge ){ return 100; }, // Divisor to compute edge forces
  nestingFactor: 5, // Nesting factor (multiplier) to compute ideal edge length for nested edges

  gravity: 80, // Gravity force (constant)
  numIter: 1000,   // Maximum number of iterations to perform
  initialTemp: 200,   // Initial temperature (maximum node displacement)
  coolingFactor: 0.95, // Cooling factor (how the temperature is reduced between consecutive iterations
  minTemp: 1.0, // Lower temperature threshold (below this point the layout will end)

  useMultitasking: true // Whether to use threading to speed up the layout
};

var cy = cytoscape({ headless: true, layout: options});

graphs.search("uid" : graph_id, createGraph);

function createGraph(data){

  






}

//from http://blog.js.cytoscape.org/2016/07/04/social-network/

function addToGraph(targetUser, followers, level) {
  // targetUser
  if (cy.getElementById(targetUser.id_str).empty()) {
    cy.add(twitterUserObjToCyEle(targetUser, level));
  }
  // targetUser's followers
  var targetId = targetUser.id_str; // saves calls while adding edges
  cy.batch(function() {
    followers.forEach(function(twitterFollower) {
      if (cy.getElementById(twitterFollower.id_str).empty()) {
        // level + 1 since followers are 1 degree out from the main user
        cy.add(twitterUserObjToCyEle(twitterFollower, level + 1));
        cy.add({
          data: {
            id: 'follower-' + twitterFollower.id_str,
            source: twitterFollower.id_str,
            target: targetId
          },
          selectable: false
        });
      }
    });
  });
}
