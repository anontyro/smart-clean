'use strict';
const deviceService = require('./deviceService');

module.exports.getDeviceByLocation = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        const locationId = event.pathParameters.locationId;
        deviceService.getDeviceByLocation(locationId, response =>{
            callback(null,response);
        })
    } catch (ex) {
        console.log(ex);
        callback(null, ex);
    }  
}

module.exports.getDeviceByUser = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        deviceService.getDeviceByUser(event, response =>{
            callback(null, response);
        })
    } catch (ex) {
        console.log(ex);
        callback(null, ex);
    }  
}

module.exports.createDevice = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        deviceService.createDevice(event, response =>{
            callback(null,response);
        })
    } catch (ex) {
        console.log(ex);
        callback(null, ex);
    }  
}

