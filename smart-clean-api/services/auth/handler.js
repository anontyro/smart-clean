/**
 * @class Authorisation Handler
 * mapping the routes to the methods the handler ensures the
 * right data is provides for the user
 */
'use strict'

const auth = require('./auth');

/**
 * Login Handler that is called when the user tries to login
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
module.exports.login = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        const {email, password} = JSON.parse(event.body);
        auth.login(email, password, resp => callback(null, resp));
    }
    catch (ex) {
        console.error(ex);
    }
}

/**
 * Register Handler that is called when the user registers
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
module.exports.register = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        auth.register(event, resp => {
            callback(null, resp);
        })
    }
    catch (ex) {
        console.error(ex);

    }

}

/**
 * Authorisation method used to ensure that the user token is valid
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
module.exports.isUserAuthorised = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const token = event.authorizationToken;
    
    try{
        auth.isUserAuthorised(token, event, resp => callback(null, resp));
  
    }
    catch(ex) {
        callback('Unauthorized');
    }

}