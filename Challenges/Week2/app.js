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

//Prompt user for input, parse and respond
alert ( parseResponse( prompt("Hello").toLowerCase() ) );
