//function that takes user response and determines reply
function parseResponse( response ) {
  var reply;
  if ( response === "hello" ) {
    reply = "Hello World!";
  } else {
    reply = "Goodbye!";
  }
  return reply;
}

//Prompt user for input and store variable
var userResponse = prompt( "Hello!" );

//Call function and alert user results
alert ( parseResponse( userResponse.toLowerCase() ) );
