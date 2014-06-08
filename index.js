var http = require('http');
var fs = require('fs');
var path = require('path');
var schedule = require('node-schedule');
var config = require('./lib/config');
var loader = require('./lib/loader');

var resultsFile = path.resolve(__dirname, './results');
var server = http.createServer();

var job = schedule.scheduleJob("0-59 * * * *", function() {
    console.log('Scheduled job');
    loader.load(config);
});

server.on('request', function(req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }

    res.writeHead(200, {
        'access-control-allow-origin': '*',
        'content-type': 'application/json'
    });

    fs.readFile(resultsFile, {encoding: 'utf-8'}, function(err, data) {
        if (err) {
            throw err;
        }

        var dataObj = {
            registered: data
        };

        res.end(JSON.stringify(dataObj));
    })
});

server.listen(config.port || 8000, function() {
    console.log("Server started at " + new Date(), "Server started");
});
