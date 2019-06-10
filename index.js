'use strict';


/* dependencies */
const request = require('request');
const querystring = require('querystring');

/* request authorization token from tigo */
const getToken =()=> {
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
        body: querystring.stringify(body)
    };

    /*Make a request */
    return request(options, function (error, response, body) {
        if (error) {
         return false
        }
        return body.data.access_token;
    })

    const charge =(options,done)=> {
        /*request token*/
        const token =getToken();
        const requestOptions = {
            url:'http://accessgwtest.tigo.co.tz:8080/PFIXERS2DM-PushBillpay',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                Authorization: 'bearer ' + token,
                Username: 'PFixers',
                Password: 'y62QXLn'
    
            }
        };
    }

}

