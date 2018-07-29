'use strict'

const connectToDatabase = require('../../connect');
const User = require('../../models/userModel');
const Project = require('../../models/projectModel');
const Location = require('../../models/locationModel');
const Device = require('../../models/deviceModel');
/**
 * Find the user by their ID and return the user object
 * @param {*} id 
 * @param {*} callback 
 */
module.exports.userLookupById = (id, callback) => {
    connectToDatabase()
        .then(() => {
            User.findById(id)
                .then(user => callback(user))
                .catch(err => {
                    console.error(err);
                    throw new Exception(err);
                })
        });
}

module.exports.getProjectsByUserId = (id) => {
    return connectToDatabase()
        .then(() => {
            Project.find({userId: id})
                .then(projects => {
                    for(let i = 0; i < projects.length; i++) {
                        projects[i].locations = [];
                        for(let j = 0; j < projects[i].locationId.length; j++) {
                            getLocationById(projects[i].locationId[j])
                                .then(loc => projects[i].locations.push(loc))
                        }
                    }
                    return projects;
                })
        })
}

module.exports.getLocationById = (id) => {
    return connectToDatabase()
        .then(() => {
            Location.find({_id: id})
                .then(loc => {
                    loc.devices = [];
                    for(let i = 0; i < loc.deviceId.length; i++) {
                        getDeviceById(loc.deviceId[i])
                            .then(device => loc.devices.push(device));
                    }
                    return loc;
                })
        })
}

module.exports.getDeviceById = (id) => {
    return connectToDatabase()
        .then(() => {
            return Device.findById(id)
        })
}