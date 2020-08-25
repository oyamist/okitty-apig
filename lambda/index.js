const pkg = require("./package.json");

exports.handler = async (event, context={}) => {
    const version = pkg && pkg.version || `(no-version)`;
    //const version = "plain-string";
    let {
        verbose,
    } = context;
    let {
        url,
        method,
    } = event;
    let {
        CLIENT_SECRET,
        ALLOW_ORIGIN,
    } = process.env || {};
    const headers = {
        'Access-Control-Allow-Origin': ALLOW_ORIGIN,
        'Content-Type': 'application/json',
    };

    let body;
    let statusCode = 200;
    try {
        let rawQueryString = event.rawQueryString || '';
        verbose && console.log(`lambda event keys:${Object.keys(event)}`);
        let query = rawQueryString.split('&').reduce((a,q)=>{
            let qparts=q.split('=');
            if (qparts.length > 1) {
                a[qparts[0]] = qparts[1];
            }
            return a;
        }, {});

        if (!ALLOW_ORIGIN) {
            throw new Error("Expected environment variable: ALLOW_ORIGIN");
        }
        if (!CLIENT_SECRET) {
            throw new Error("Expected environment variable: CLIENT_SECRET");
        }
        body = {
            version: `okitty-apig ${version}`,
            method,
            url,
            event: Object.keys(event),
            CLIENT_SECRET,
            query,
        };
    } catch(e) {
        statusCode = 400;
        body = e.message;
    } finally {
        body = JSON.stringify(body, null, 2);
    }

    return {
        statusCode,
        body,
        headers,
    };
};
