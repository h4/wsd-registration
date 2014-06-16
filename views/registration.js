"use strict";
var fs = require('fs');
var path = require('path');
var Spreadsheet = require('edit-google-spreadsheet');

/**
 *
 * @param res
 * @param config
 * @param {Object} postData Данные из формы
 * @param {String} postData.spreadsheetid
 * @param {String} postData.name
 * @param {String} postData.email
 * @param {String} postData.twitter
 * @param {String} postData.additional
 * @param {Function} callback
 */
function registrationView(res, config, postData, callback) {
    res.writeHead(200, {
        'access-control-allow-origin': '*',
        'content-type': 'application/json'
    });

    config.spreadsheetId = postData.spreadsheetid;

    Spreadsheet.load(config, function sheetReady(err, spreadsheet) {
        if (err) {
            callback(err);
            return;
        }

        spreadsheet.receive(function (err, rows, info) {
            if (err) {
                callback(err);
                return;
            }

            var addedObj = {};
            var dateTime = new Date();
            var rowData = [
                dateTime.toUTCString(),
                postData.name,
                postData.email,
                postData.twitter,
                postData.additional
            ];
            addedObj[info.nextRow] = [rowData];
            spreadsheet.add(addedObj);

            spreadsheet.send(function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                var dataObj = {
                    result: "success"
                };

                res.end(JSON.stringify(dataObj));
            });
        });
    });
}

module.exports = registrationView;
