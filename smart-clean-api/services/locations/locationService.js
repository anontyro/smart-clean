/**
 * @class Location Service
 * Service to handle all of the location logic
 */
'user strict';

const connectToDatabase = require('../../connect');
const ProjectLocation = require('../../models/locationModel');
const standardResponse = require('../utils/apiUtils').standardResponse;
const Device = require('../../models/deviceModel');

/** No in use */
module.exports.getLocationsByProjectId = () => {
    // look up location object + get the locationId array

    // loop over the array to get each location

    // return locations array
}

/**
 * Get Location by the UserId
 * returns a list of all locations that the user has access to
 * @param {*} event 
 * @param {*} callback 
 */
module.exports.getLocationByUserId = (event, callback) => {
    const userId = JSON.parse(event.requestContext.authorizer.user).id;

    connectToDatabase()
        .then(() => {
            ProjectLocation.find({userId: userId})
                .then(locationList => {
                    callback(standardResponse(200,
                        {
                            locationList: locationList,
                            message: 'location list returned'
                        }
                    ))
                })
        })
};

const attachDevice = (locationId, deviceId) => {
    return connectToDatabase()
        .then(() => {
            return Device.findByIdAndUpdate(deviceId, {locationId: locationId})
                .then(response => response);
        })
}

/**
 * Create a new location
 * Add a new location to the location table
 * @param {*} event 
 * @param {*} callback 
 */
module.exports.createLocation = (event, callback) => {
    const userId = JSON.parse(event.requestContext.authorizer.user).id;
    const location = JSON.parse(event.body);
    location.userId = [userId];

    connectToDatabase()
        .then(() => {
            ProjectLocation.create(location)
                .then(loc => {
                    if (loc.deviceId.length > 0) {
                        loc.deviceId.forEach(dev => {
                            attachDevice(loc._id, dev)
                                .then(next => next);
                        });
                    }
                    callback(standardResponse(201,
                        {
                            location: loc,
                            message: 'Successfully added a new Location'
                        }
                    ))
                })
        })
};

/**
 * Update location
 * requires a location in the body to be used to update the current item in the table
 * @param {*} event 
 * @param {*} callback 
 */
module.exports.updateLocation = (event, callback) => {
    const location = JSON.parse(event.body);

    if(location.created) {
        delete location.created;
    }

    connectToDatabase()
        .then(() => {
            ProjectLocation.findByIdAndUpdate(location._id, location)
                .then(loc => callback(standardResponse(200,
                    {                        
                        location: loc,
                        message: 'Successfully updated the location'
                    }
                )))
        })

}