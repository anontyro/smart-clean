/**
 * @class Project Service
 */
'use strict';

const connectToDatabase = require('../../connect');
const Project = require('../../models/projectModel');
const ProjectLocation = require('../../models/locationModel');
const Device = require('../../models/deviceModel');
const standardResponse = require('../utils/apiUtils').standardResponse;

/** Get Project Location from locationId returns promise */
const getProjectLocation = (locationId) => {
    return connectToDatabase()
        .then(() => {
            return ProjectLocation.findById(locationId);
        });
}

/** Get project from its id and returns it as a promise */
const getProject = (projectId) => {
    return connectToDatabase()
        .then(() => {
            return Project.findById(projectId);
        })
}

/** Get device from its id and returns a promise */
const getDevice = (deviceId) => {
    return connectToDatabase()
        .then(() => {
            return Device.findById(deviceId)
        })
}

/**
 * Get Complete Project Object
 * This method works by getting all of the data from the other
 * tables and agrigates them into one large meta object
 * that contains all the details this method is async and must be awaited
 * @param {*} projectId 
 */
module.exports.getCompleteProject = async (projectId) => {
    const project = await getProject(projectId);
    const locArr = [];

    for(let i = 0; i < project.locationId.length; i ++) {
        const location = await getProjectLocation(project.locationId[i]);
        const deviceList = [];
        for(let i = 0; i < location.deviceId.length; i++) {
            const device = await getDevice(location.deviceId[i]);
            deviceList.push(device);
        }
        const finishedLocation = {
            id: location.id,
            display_name: location.display_name,
            devices: deviceList
        }
        locArr.push(finishedLocation);
    }
    const output = {
        pid: project.pid,
        display_name: project.display_name,
        created: project.created,
        locations: locArr
    };

    return Promise.resolve( standardResponse(200, {
        project: output,
        message: 'project built' 
    }));
}

/**
 * Get Projects By User Id
 * returns a list of all the projects from the userId
 * @param {*} userId 
 * @param {*} callback 
 */
module.exports.getProjectsByUserId = (userId, callback) =>{
    connectToDatabase()
        .then(() => {
            Project.find({userId: userId})
                .then(projectList => callback(
                    standardResponse(200, {
                        projectList: projectList,
                        message: 'project list returned'      
                    })))
        })
}

/**
 * Create a new project
 * takes a project object in the body and completes it and saves into the
 * data
 * @param {*} event 
 * @param {*} userId 
 * @param {*} callback 
 */
module.exports.createProject = (event, userId ,callback) => {
    const project = JSON.parse(event.body);
    project.userId = [userId];
    connectToDatabase()
        .then(() => {
            Project.create(project)
            .then(p => {
                callback(standardResponse(200, {
                    project: p,
                    message: 'Successfully created new project'
                }))
            })
        });
};

/**
 * Update project
 * uses an object from the body and finds it in the database before updating it
 * @param {*} event 
 * @param {*} callback 
 */
module.exports.updateProject = (event, callback) => {
    const project = JSON.parse(event.body);

    if(project.created) {
        delete project.created;
    }

    connectToDatabase()
        .then(() => {
            Project.findByIdAndUpdate(project._id, project)
                .then(project => {
                    callback(
                        standardResponse(200, {
                            project: project,
                            message: 'Successfully updated project: ' + project.display_name    
                        }))   
                })
        })

}