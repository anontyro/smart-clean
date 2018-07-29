'use strict';
const locationService = require('./locationService');

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

module.exports.updateLocation = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

}

module.exports.deleteLocation = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

}