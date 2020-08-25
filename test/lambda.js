(typeof describe === 'function') && describe("lambda", function() {
    //const fs = require('fs');
    //const path = require('path');
    const should = require("should");
    const { handler} = require('../lambda/index');

    it("TESTTESTinvoke async lambda", done=>{ 
        (async function() { try {
            var event = {
                hello: 'world',
                rawQueryString: 'color=red&size=large',
            }
            var {
                statusCode,
                body,
            } = await handler(event);
            console.log(`statusCode`, statusCode);
            console.log(body);
            done();
        } catch(e) { done(e); }})(); 
    });
})
