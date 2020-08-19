const pkg = require("./package.json");

exports.handler = async (event, context) => {
    const version = pkg && pkg.version || `(no-version)`;
    //const version = "plain-string";
    const headers = {
        'Content-Type': 'application/json',
    };

    let body;
    let statusCode = 200;
    let { env } = process;
    try {
        body = {
            version: `okitty-apig ${version}`,
            event,
            env,
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
