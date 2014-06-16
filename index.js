var http = require('http');
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var schedule = require('node-schedule');
var winston = require('winston');
var Mail = require('winston-mail').Mail;
var config = require('./lib/config');
var loader = require('./lib/loader');
var indexView = require('./views/index');
var registrationView = require('./views/registration');
var errorView = require('./views/error');

var server = http.createServer();

var job = schedule.scheduleJob("0-59 * * * *", function() {
    loader.load(config);
});

winston.add(winston.transports.File, { filename: 'logs/registration.log' });
winston.add(Mail, {
    to: "Mikhail Baranov <dev@brnv.ru>"
});
winston.remove(winston.transports.Console);

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
                    registrationView(res, config, qs.parse(body), function(err) {
                        if (err) {
                            winston.error(err.message);
                            errorView(res, 500, 'Server error');
                        }
                    });
                })
            } else {
                winston.info('Bad registration');
                errorView(res, 400, 'Bad request');
            }
            break;
    }
});

server.listen(config.port || 8000, function(err) {
    console.log("Server started at " + new Date(), "Server started");
});
