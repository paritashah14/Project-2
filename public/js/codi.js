///Console app to get a response from CODI
//
//node codi.js Whatever you want to ask Codi
//node codi.js create a task to eat dinner today at 7pm



var apiai = require('apiai');
 
var app = apiai("aa7a66c8d2734135b817745ffa71115c");

var phrase = process.argv;
phrase.splice(0,2);
var q = phrase.join(" ");
 
var request = [];

request[0]= app.textRequest(q, {
    sessionId: 'CODI-TEST-001'
});
 
request[0].on('response', function(response) {
    console.log(response.result.fulfillment.speech);
    console.log(response.result.parameters);
});
 
request[0].on('error', function(error) {
    console.log(error);
});
request[0].end();
 
