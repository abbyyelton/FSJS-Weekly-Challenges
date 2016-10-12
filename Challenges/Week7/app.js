//See readme for challenge instructions
var getRepos = require('./github.js');

//get username(s) from command line
var args = process.argv.slice(2);
args.forEach( function(username) {
  //get Repos
  var repo = new getRepos(username);

  //Write repos
  repo.on('end', function(repos) {
    console.log('Username:');
    console.log(repos[0].owner.login);
    console.log('Repositories:');
    repos.forEach( function(item) {
      var consoleString = item.name;
      //check for description
      if (item.description != '') {
        consoleString += ' -- ' + item.description;
      }
      //see if forked
      if (item.fork) {
        consoleString += ' -- Forked';
      }
      console.log(consoleString);
    });
  });

  repo.on('error', function(error) {
    //show error
    console.log('There was an error: ' + error.message);
  });

});
