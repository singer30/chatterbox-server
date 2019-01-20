
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

sendResponse = (response, data, statusCode) => {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};
 

collectData = function(request, callBack) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callBack(JSON.parse(data));
  });
};

var objectId = 1;
var messages = [
  {
  }
];

var actions = {
  'POST': function(request, response) {
    collectData(request, function(message) {
      messages.push(message); 
      message.objectId = ++objectId;
      sendResponse(response, {objectId: 1});
    });
  },
  'GET': function(request, response) {
    sendResponse(response, {results: messages});
  },
  'OPTIONS': function(request, response) {
    sendResponse(response, null);
  }
};

requestHandler = function(request, response) {

  var action = actions[request.method];
  if (action) {
    action(request, response);
  } else {
    // TODO : ERROR HANDLING
    sendResponse(response, 'Not Found', 404);
  }

};

module.exports.sendResponse = sendResponse;
module.exports.collectData = collectData;
module.exports.requestHandler = requestHandler;