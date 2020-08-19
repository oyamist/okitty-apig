#!/usr/bin/env node

var { handler } = require('../index.js');

(async function() { try {
    var event = {
        hello: 'world',
    }
    var {
        statusCode,
        body,
    } = await handler(event);
    console.log(`statusCode`, statusCode);
    console.log(body);
} catch(e) {
    console.error(e);
}})();
