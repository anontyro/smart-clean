/**
 * @class Location Handler
 */
'use strict';
const locationService = require('./locationService');

/**
 * Not In Use
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
module.exports.getLocationsByProjectId = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        const userId = JSON.parse(event.requestContext.authorizer.user).id;
        const projectId = event.pathParameters.projectId;
        locationService.getLocationsByProjectId(userId, response =>{
            callback(null,response);
        })
    } catch (ex) {
        console.log(ex);
        callback(null, ex);
    }   
}

/**
 * Get a list of all locations by the userId
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
module.exports.getLocationByUser = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        locationService.getLocationByUserId(event, response =>{
            callback(null,response);
        })
    } catch (ex) {
        console.log(ex);
        callback(null, ex);
    }

}

/**
 * Create a new location object
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
module.exports.createLocation = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        locationService.createLocation(event, response =>{
            callback(null,response);
        })
    } catch (ex) {
        console.log(ex);
        callback(null, ex);
    }

}

/**
 * Update the location in the database
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
module.exports.updateLocation = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        locationService.updateLocation(event, response =>{
            callback(null,response);
        })
    } catch (ex) {
        console.log(ex);
        callback(null, ex);
    }

}

/** Not Implemented */
module.exports.deleteLocation = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

}