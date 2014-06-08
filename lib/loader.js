var fs = require('fs');
var path = require('path');
var Spreadsheet = require('edit-google-spreadsheet');

var resultsFile = path.resolve(__dirname, '../results');

function load(config) {
    Spreadsheet.load(config, function sheetReady(err, spreadsheet) {
        if (err) {
            throw err;
        }

        spreadsheet.receive(function (err, rows, info) {
            if (err) {
                throw err;
            }

            fs.writeFile(resultsFile, info.totalRows - 1, function (err) {
                if (err) {
                    throw err;
                }

                console.log(new Date());
            });
        });
    });
}

exports.load = load;
