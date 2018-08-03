/**
 * @class Device Service
 * Contains all of the methods to be used to get devices to the user
 * from the table
 */
'use strict';

const connectToDatabase = require('../../connect');
const Device = require('../../models/deviceModel');
const standardResponse = require('../utils/apiUtils').standardResponse;
const ProjectLocation = require('../../models/locationModel');

/**
 * Device By Location
 * Using the locationId to find the correct device list for that location
 * and return it to the user
 * @param {*} locationId LocationId
 * @param {*} callback 
 */
module.exports.getDeviceByLocation = (locationId, callback) => {
    connectToDatabase()
        .then(() => {
            Device.find({locationId: locationId})
                .then(deviceList => callback(standardResponse(200,{
                    deviceList: deviceList,
                    message: 'device list returned for user'
                })))
        })
}

/**
 * Device By User 
 * Get the user Id from the token and find all devices for the user
 * @param {*} event 
 * @param {*} callback 
 */
module.exports.getDeviceByUser = (event, callback) => {
    const userId = JSON.parse(event.requestContext.authorizer.user).id;

    connectToDatabase()
        .then(() => {
            Device.find({userId: userId})
                .then(deviceList => callback(
                    standardResponse(200, {
                        deviceList: deviceList,
                        message: 'device list returned for user',
                        userId: userId         
                    })))
        })
}

/**
 * Create Device
 * Add method to add a new device to the users device list
 * passed in the body
 * @param {*} event 
 * @param {*} callback 
 */
module.exports.createDevice = (event, callback) => {
    const userId = JSON.parse(event.requestContext.authorizer.user).id;
    const device = JSON.parse(event.body);
    device.userId = [userId];
    connectToDatabase()
        .then(() => {
            Device.create(device)
                .then(dev => callback(
                    standardResponse(201, {
                        device: dev,
                        message: 'device has been successfully created'             
                    })));
        })
};

/**
 * Update Device
 * Update method used to find and update the device in the database
 * as required
 * @param {*} event 
 * @param {*} callback 
 */
module.exports.updateDevice = (event, callback) => {
    const device = JSON.parse(event.body);

    connectToDatabase()
        .then(() => {
            Device.findByIdAndUpdate(device._id, device)
                .then(dev => callback(
                    standardResponse(201, {
                        device: dev,
                        message: 'device has been successfully created'
                    })))
        })
}

const detachLocation = (locationId, deviceId) => {
    return ProjectLocation.findById(locationId)
        .then(loc => {
            console.log(locationId);
            for(let i = 0; i < loc.deviceId.length; i++) {
                console.log(loc[i]);
                if(loc[i].deviceId === deviceId) {
                    loc.deviceId.splice(i, 1);
                    return ProjectLocation.update(loc)
                        .then(result => result)
                }
            }
        })
}

module.exports.detachDevice = (event, callback) => {
    const device = JSON.parse(event.body);
    connectToDatabase()
        .then(() => {
            ProjectLocation.findById(device.locationId)
            .then(loc => {
                console.log(loc);
                for(let i = 0; i < loc.deviceId.length; i++) {
                    console.log(loc[i]);
                    if(loc[i].deviceId === deviceId) {
                        loc.deviceId.splice(i, 1);
                        return ProjectLocation.update(loc)
                            .then(result => result)
                    }
                }
            })
            .then(() => {
                device.locationId = '';
                Device.findByIdAndUpdate(device._id, device)
                    .then(next => {
                        callback(
                            standardResponse(200, {
                                device: next,
                                message: 'detached device from location'
                            })
                        )
                    })
                })
        })

}