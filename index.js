'use strict';


/* dependencies */
const request = require('request');
const _ = require('lodash');

/**
 * @name country
 * @description Human readable country code of a payment processing entity.
 */
const country = 'TZ';


/**
 * @name provider
 * @description Human readable name of a payment processing entity.
 */
const provider = 'Tigo';


/**
 * @name method
 * @description Human readable supported method of a payment.
 */
const method = 'Mobile Money';


/**
 * @name channel
 * @description Human readable supported channel of a payment.
 */
const channel = 'TIGOPESA';


/**
 * @name mode
 * @description Human readable supported mode of a payment.
 */
const mode = 'USSD Push';


/**
 * @name currency
 * @description Currency accepted for payment.
 */
const currency = 'TZS';


/**
 * @name gateway
 * @description Machine readable name of a client as gateway.
 */
const gateway = _.toLower(`${country}-${channel}-${_.kebabCase(mode)}`);

/* A function which returns default parameters*/
const withDefaults = optns => {
    let options = _.merge({}, {
        businessNumber: '',
        username: '',
        password: '',
        grant_type: '',
        loginUrl: '',
        billUrl: ''
    }, optns);
    // ensure business number
    options.businessNumber = (options.number || options.businessNumber);
    return options;
};
/* A function to return gatewy info */
const info = optns => {
    // merge overrides with defauls
    const {
        businessNumber: number,
        username,
        password,
        grant_type,
        loginUrl,
        billUrl,
    } = withDefaults(optns);

    // pack normalized information
    const business = { number, username, password, grant_type, loginUrl, billUrl };
    const meta = { country, provider, method, channel, mode, currency, gateway };
    const details = _.merge({}, meta, business);

    // return normalized client information
    return details;
};
/* request authorization token from tigo */
const login = (loginOptions) => {
    /*Prepare request body */
    const { username, password, grant_type, loginUrl } = withDefaults(loginOptions);
    const body = {
        username: username,
        password: password,
        grant_type: grant_type
    };
    /*Prepare request options */
    const options = {
        url: loginUrl,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',

        },
        form: body
    };

    /*Make a request */
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
};
async function charge(options, done) {
    console.log('test', options);
    const username = options.username;
    const password = options.password;
    const grant_type = options.grant_type;
    const loginUrl = options.loginUrl;
    const loginOptions = { username, password, grant_type, loginUrl };
    const { billUrl, businessNumber } = withDefaults(options);
    // console.log('test', withDefaults(options));
    /*request token*/
    const token = JSON.parse(await login(loginOptions)).access_token;
    const body = {
        CustomerMSISDN: options.msisdn,
        BillerMSISDN: businessNumber,
        Amount: options.amount,
        Remarks: options.description,
        ReferenceID: options.reference,
    };
    const requestOptions = {
        url: billUrl,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            Authorization: 'bearer ' + token,
            Username: username,
            Password: password

        },
        body: body,
        json: true

    };
    /*Make a request */
    return request(requestOptions, function (error, response, body) {
        console.log('body', body);
        const feedback = {
            reference: body.ReferenceID,
            status: (body.ResponseStatus ? 'processed' : 'failed'),
            result: {
                code: body.ResponseCode,
                description: body.ResponseDescription
            }
        };
        console.log('feedback', feedback);
        return done(error, feedback);
    });
}
module.exports = exports = { charge, login, info }
