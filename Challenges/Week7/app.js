//See readme for challenge instructions
var getRepos = require('./github.js');

//get username(s) from command line
if ( process.argv.length < 3 ) {
  console.log('Proper usage: node app.js <username1> <username2> ...');
}
var args = process.argv.slice(2);
args.forEach( function(username) {
  //get Repos
  var repo = new getRepos(username);
});
