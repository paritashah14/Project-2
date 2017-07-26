var apiai = require('apiai');
 
var app = apiai("aa7a66c8d2734135b817745ffa71115c");
 
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

request[2] = app.textRequest('create a task to finish codi project on Saturday at 10am', {
    sessionId: 'CODI-TEST-001'
});
 
request[2].on('response', function(response) {
    console.log(response);
});
 
request[2].on('error', function(error) {
    console.log(error);
});
 

request[2].end();

