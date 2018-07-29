'user strict';

const connectToDatabase = require('../../connect');
const ProjectLocation = require('../../models/locationModel');

module.exports.getLocationsByProjectId = () => {
    // look up location object + get the locationId array

    // loop over the array to get each location

    // return locations array
}

module.exports.getLocationByUserId = (event, callback) => {
    const userId = JSON.parse(event.requestContext.authorizer.user).id;

    connectToDatabase()
        .then(() => {
            ProjectLocation.find({userId: userId})
                .then(locationList => {
                    callback({
                        statusCode: 200,
                        body: JSON.stringify({
                            locationList: locationList,
                            message: 'location list returned'
                        })
                    })
                })
        })
};

module.exports.createLocation = (event, callback) => {
    const userId = JSON.parse(event.requestContext.authorizer.user).id;
    const location = JSON.parse(event.body);
    location.userId = [userId];

    connectToDatabase()
        .then(() => {
            ProjectLocation.create(location)
                .then(loc => {
                    callback({
                        statusCode: 201,
                        body: JSON.stringify({
                            location: loc,
                            message: 'Successfully added a new Location'
                        })
                    })
                })
        })

};