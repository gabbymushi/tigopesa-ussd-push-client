'use strict';


/* dependencies */
const request = require('request');

/* request authorization token from tigo */
function getToken() {
    /*Prepare request body */
    const body = {
        username: 'PFixers',
        password: 'y62QXLn',
        grant_type: 'password'
    };
    /*Prepare request options */
    const options = {
        url: 'http://accessgwtest.tigo.co.tz:8080/PFIXERS2DM-GetToken',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',

        },
        body: body
    };

    /*Make a request */
    request(options, function (error, response, body) {
        if (error) {
         return false
        }
    })



}

