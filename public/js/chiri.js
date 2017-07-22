var apiai = require('apiai');
 
var app = apiai("ed791a3ea6634d10a495da9af7dc7fe3");
 
var request = [];

request[0]= app.textRequest('class time?', {
    sessionId: 'CODI-TEST-001'
});
 
request[0].on('response', function(response) {
    console.log(response);
});
 
request[0].on('error', function(error) {
    console.log(error);
});
request[0].end();
 

request[1] = app.textRequest('how you doin?', {
    sessionId: 'CODI-TEST-001'
});
 
request[1].on('response', function(response) {
    console.log(response);
});
 
request[1].on('error', function(error) {
    console.log(error);
});
request[1].end(); 

request[2] = app.textRequest('who are you', {
    sessionId: 'CODI-TEST-001'
});
 
request[2].on('response', function(response) {
    console.log(response);
});
 
request[2].on('error', function(error) {
    console.log(error);
});
 

request[2].end();