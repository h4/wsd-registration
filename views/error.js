"use strict";

function errorView(res, code, message) {
    res.writeHead(code, {
        'access-control-allow-origin': '*',
        'content-type': 'application/json'
    });

    var dataObj = {
        result: "error",
        message: message
    };

    res.end(JSON.stringify(dataObj));
}

module.exports = errorView;
