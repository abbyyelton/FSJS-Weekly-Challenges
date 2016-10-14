//See readme for challenge instructions

/*
 * Note about github api: requires User-Agent header to be set. This can be done
 * in Node by passing an options object (rather than a simple url string) as the
 * first param to the https.get() function
 *
 * So something like
 * var options = {
 *   hostname: api.github.com,
 *   path: <<try to find in documentation linked in readme>>,
 *   headers: {
 *     'User-Agent': '<<your github username>>'
 *   }
 * };
 *
 */

var EventEmitter = require("events").EventEmitter;
var https = require("https");
var http = require("http");
var util = require("util");

function displayData(username, data) {
  console.log('Username:');
  console.log(username);
  console.log('Repositories:');
  data.forEach( function(item) {
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
}

function getRepos(username) {

    EventEmitter.call(this);

    var reposEmitter = this;

    var options = {
       hostname: 'api.github.com',
       path: '/users/' + username + '/repos',
       headers: {
         'User-Agent': 'abbyyelton'
       }
     };

    //Connect to the API URL
    var request = https.get(options, function(response) {
        var body = "";

        if (response.statusCode !== 200) {
            request.abort();
            //Status Code Error
            console.log("There was an error getting the repos for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")");
        }

        //Read the data
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            if(response.statusCode === 200) {
                try {
                    //Parse the data
                    var repos = JSON.parse(body);
                    //Display the data
                    displayData(username, repos);
                } catch (error) {
                  console.log("There was an error");
                }
            }
        }).on("error", function(error){
            console.log("There was an error");
        });
    });

}

util.inherits( getRepos, EventEmitter );

module.exports = getRepos;
