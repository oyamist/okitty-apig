#!/usr/bin/env node

// TODO: Use AWS SAM instead of this

require('dotenv').config();
const { handler } = require("../lambda/index");
const express = require('express')
const app = express();
const port = 3100;

const {
    ALLOW_ORIGIN,
} = process.env;
console.log(`starting lambda server ALLOW_ORIGIN:`, ALLOW_ORIGIN);

app.all('/', (req, res) => {
  res.statusCode = 404;
  res.send('Sadness')
})

app.all('/lambda', (req, res) => {
    var context = {
        verbose: true,
    };
    let {
        method,
    } = req;
    (async function() { try {
        var event = {
        }
        var hres = await handler(req, context);
        var {
            headers,
            body,
            statusCode,
        } = hres;
        res.statusCode = statusCode;
        for (const [key,value] of Object.entries(headers)) {
            res.setHeader(key, value);
        }
        var json = JSON.parse(body);
        console.log(`lambda wrapper ${method} =>`, 
            JSON.stringify(json,null,2));
        res.json(json);
    } catch(e) {
        console.error(`ERROR: ${method} lambda wrapper`, e);
    }})();
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
