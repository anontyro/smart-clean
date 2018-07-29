'use strict'

const auth = require('./auth');

module.exports.login = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        const {email, password} = JSON.parse(event.body);
        auth.login(email, password)
            .then(resp =>  callback(null, resp))
    }
    catch (ex) {
        console.error(ex);
    }

}

module.exports.register = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        
        
    }
    catch (ex) {
        console.error(ex);

    }

}

module.exports.isUserAuthorised = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

}