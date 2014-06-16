"use strict";

function errorView(res, code, message) {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    });

    var dataObj = {
        result: "error",
        code: code,
        message: message
    };

    res.end(JSON.stringify(dataObj));
}

module.exports = errorView;
