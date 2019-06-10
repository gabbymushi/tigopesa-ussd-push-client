'use strict';


/* dependencies */
const request = require('request');

/* request authorization token from tigo */
function getToken() {
    /*Prepare request options */
    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',

        }
    };
    /*Prepare request body */
    const requestBody = {
        username: 'PFixers',
        password: 'y62QXLn',
        grant_type: 'password'
    };


}

