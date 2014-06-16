"use strict";

function errorView(res, code, message) {
    res.writeHead(code, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    });

    var dataObj = {
        result: "error",
        message: message
    };

    res.end(JSON.stringify(dataObj));
}

module.exports = errorView;
