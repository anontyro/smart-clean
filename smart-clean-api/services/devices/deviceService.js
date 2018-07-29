'use strict';

const connectToDatabase = require('../../connect');
const Device = require('../../models/deviceModel');

module.exports.getDeviceByLocation = (locationId, callback) => {
    connectToDatabase()
        .then(() => {
            Device.find({locationId: locationId})
                .then(deviceList => callback({
                    statusCode: 200,
                    body: JSON.stringify({
                        deviceList: deviceList,
                        message: 'device list returned for user'
                    })
                }))
        })
}

module.exports.getDeviceByUser = (event, callback) => {
    const userId = JSON.parse(event.requestContext.authorizer.user).id;

    connectToDatabase()
        .then(() => {
            Device.find({userId: userId})
                .then(deviceList => callback({
                    statusCode: 200,
                    body: JSON.stringify({
                        deviceList: deviceList,
                        message: 'device list returned for user',
                        userId: userId
                    })
                }))
        })
}

module.exports.createDevice = (event, callback) => {
    const userId = JSON.parse(event.requestContext.authorizer.user).id;
    const device = JSON.parse(event.body);
    device.userId = [userId];
    connectToDatabase()
        .then(() => {
            Device.create(device)
                .then(dev => callback({
                    statusCode: 201,
                    body: JSON.stringify({
                        device: dev,
                        message: 'device has been successfully created'
                    })
                }));
        })
};

module.exports.updateDevice = (event, callback) => {
    const device = JSON.parse(event.body);

    connectToDatabase()
        .then(() => {
            Device.findByIdAndUpdate(device._id, device)
                .then(dev => callback({
                    statusCode: 201,
                    body: JSON.stringify({
                        device: dev,
                        message: 'device has been successfully created'     
                    })
                }));
        })
}