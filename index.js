var http = require('http');
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var schedule = require('node-schedule');
var config = require('./lib/config');
var loader = require('./lib/loader');
var indexView = require('./views/index');
var registrationView = require('./views/registration');

var server = http.createServer();

var job = schedule.scheduleJob("0-59 * * * *", function() {
    console.log('Scheduled job');
    loader.load(config);
});

server.on('request', function(req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }

    switch (req.url) {
        case '/favicon.ico':
            return;
            break;
        case '/':
            indexView(res);
            break;
        case '/registration/':
            if (req.method === 'POST') {
                var body = '';
                req.on('data', function(data) {
                    body += data;
                });

                req.on('end', function() {
                    registrationView(res, config, qs.parse(body));
                })
            }
            break;
    }
});

server.listen(config.port || 8000, function() {
    console.log("Server started at " + new Date(), "Server started");
});
