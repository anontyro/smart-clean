'use strict';

const connectToDatabase = require('../../connect');
const Project = require('../../models/projectModel');
const ProjectLocation = require('../../models/locationModel');
const Device = require('../../models/deviceModel');

const getProjectLocation = (locationId) => {
    return connectToDatabase()
        .then(() => {
            return ProjectLocation.findById(locationId);
        });
}

const getProject = (projectId) => {
    return connectToDatabase()
        .then(() => {
            return Project.findById(projectId);
        })
}

const getDevice = (deviceId) => {
    return connectToDatabase()
        .then(() => {
            return Device.findById(deviceId)
        })
}

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
    console.log(output);
    return {
        statusCode: 200,
        body: {
            project: output,
            message: 'project built'
        }
    };
}

module.exports.getProjectsByUserId = (userId, callback) =>{
    connectToDatabase()
        .then(() => {
            Project.find({userId: userId})
                .then(projectList => callback({
                    statusCode: 200,
                    body: JSON.stringify({
                        projectList: projectList,
                        message: 'project list returned'
                    })
                }))
        })
}

module.exports.createProject = (event, userId ,callback) => {
    const project = JSON.parse(event.body);
    project.userId = [userId];
    connectToDatabase()
        .then(() => {
            Project.create(project)
            .then(p => {
                callback({
                    statusCode: 201,
                    body: JSON.stringify({
                        project: p,
                        message: 'Successfully created new project'
                    })
                })
            })
        });
};

module.exports.updateProject = (event, callback) => {
    const project = JSON.parse(event.body);

    if(project.created) {
        delete project.created;
    }

    connectToDatabase()
        .then(() => {
            Project.findByIdAndUpdate(project._id, project)
                .then(project => {
                    callback({
                        statusCode: 200,
                        body: JSON.stringify({
                            project: project,
                            message: 'Successfully updated project: ' + project.display_name
                        })
                    })   
                })
        })

}