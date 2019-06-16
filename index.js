'use strict';


/* dependencies */
const request = require('request');
const _ = require('lodash');

/* request authorization token from tigo */
const getToken = () => {
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
        form: body
    };

    /*Make a requests */
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        })
    });
}
async function charge(options, done) {
    /*request token*/
    const token = JSON.parse(await getToken()).access_token;
    const body = {
        CustomerMSISDN: options.msisdn,
        BillerMSISDN: options.businessNumber,
        Amount: options.amount,
        // Remarks: options.description,
        ReferenceID: options.reference,
    };
    const requestOptions = {
        url: 'http://accessgwtest.tigo.co.tz:8080/PFIXERS2DM-PushBillpay',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            Authorization: 'bearer ' + token,
            Username: 'PFixers',
            Password: 'y62QXLn'

        },
        body: body,
        json: true

    };
    /*Make a request */
    return request(requestOptions, function (error, response, body) {
        return done(error, body);
    })
}
module.exports = exports = { charge, getToken }
