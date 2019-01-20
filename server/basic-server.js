/* Import node's http module: */
var http = require('http');
var handleRequest = require('./request-handler.js');
//var { sendResponse, requestHandler, collectData } = require('./request-handler.js');
var urlParser = require('url');

// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
var port = 3000;

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
var ip = '127.0.0.1';



// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
//
// After creating the server, we will tell it to listen on the given port and IP. */

var routes = {
  '/classes/chatterbox': handleRequest.requestHandler
};



var server = http.createServer(function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
    
  var parts = urlParser.parse(request.url);
  console.log('This is Parts........', parts);

  var route = parts.pathname;
  console.log('this is routeeeeeeeeee', route);
  if (route) {
    handleRequest.requestHandler(request, response);
  } else {
    handleRequest.sendResponse(response, 'Not Found', 404);
  }

});


console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip);


// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
