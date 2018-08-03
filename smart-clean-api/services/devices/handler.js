/**
 * @class Device Handler
 * Handler that maps the device endpoints to the service methods
 */
'use strict';
const deviceService = require('./deviceService');

/**
 * Get Device By LocationId
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
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

/**
 * Get Device By UserId
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
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

/**
 * Create Device
 * requires the device to be sent in the body
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
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

/**
 * Update a device already in the database
 * requires the device to be sent in the body
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
module.exports.updateDevice = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        deviceService.updateDevice(event, response =>{
            callback(null,response);
        })
    } catch (ex) {
        console.log(ex);
        callback(null, ex);
    } 
}

module.exports.detachDevice = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        deviceService.detachDevice(event, response =>{
            callback(null,response);
        })
    } catch (ex) {
        console.log(ex);
        callback(null, ex);
    } 
}

