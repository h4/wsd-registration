"use strict";
var fs = require('fs');
var path = require('path');
var resultsFile = path.resolve(__dirname, '../results');

function indexView(res) {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    });

    fs.readFile(resultsFile, {encoding: 'utf-8'}, function(err, data) {
        if (err) {
            throw err;
        }

        var dataObj = {
            registered: data
        };

        res.end(JSON.stringify(dataObj));
    });
}

module.exports = indexView;
