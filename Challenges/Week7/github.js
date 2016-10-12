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
            reposEmitter.emit("error", new Error("There was an error getting the repos for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"));
        }

        //Read the data
        response.on('data', function (chunk) {
            body += chunk;
            reposEmitter.emit("data", chunk);
        });

        response.on('end', function () {
            if(response.statusCode === 200) {
                try {
                    //Parse the data
                    var repos = JSON.parse(body);
                    reposEmitter.emit("end", repos);
                } catch (error) {
                    reposEmitter.emit("error", error);
                    console.log("there was an error");
                }
            }
        }).on("error", function(error){
            reposEmitter.emit("error", error);
            console.log("there was an error");
        });
    });

}

util.inherits( getRepos, EventEmitter );

module.exports = getRepos;
