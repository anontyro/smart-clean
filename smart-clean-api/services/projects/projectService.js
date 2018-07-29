'use strict';

const connectToDatabase = require('../../connect');
const Project = require('../../models/projectModel');


module.exports.getProjectsByUserId = () =>{

}

module.exports.createProject = (event, userId ,callback) => {
    const project = JSON.parse(event.body);
    project.userId = [userId];
    console.log(project);
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