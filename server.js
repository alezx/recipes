var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');


function send404 (response) {
	response.writeHead(200,{'Content-Type':'text/plain'});
	response.write('Error 404: resource not found');
	response.end();
}

function sendFile (response, filePath, fileContents) {
	response.writeHead(
		'content-type',
		mime.lookup(path.basename(filePath))
		);
	response.end(fileContents);
}

function serveStatic (response, absPath) {
	fs.exists(absPath, function(exists) {
		if (exists) {
			fs.readFile(absPath,function(err,data) {
				sendFile(response,absPath,data);
			});
		} else {
			send404(response);
		}
	});
}

var server = http.createServer(function(request,response) {
	var filePath = false;
	console.log('request.url  = '+request.url);
	if (request.url == '/') {
		filePath = 'index.html';
	} else if (request.url === '/primi.html' || request.url === '/secondi.html') {
		response.render('about', {
			title: 'About'
		});
	} else {
		filePath = request.url;
	}
	if (!filePath) {
		send404(response);
	} else {
		var absPath = './' + filePath;
		serveStatic(response,absPath);
	}
});

server.listen(3000, function() {
	console.log("server listening on port 3000");
});
