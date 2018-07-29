'use strict';
const projectService = require('./projectService');

module.exports.getProjectsByUserId = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

}

module.exports.getProject = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

}

module.exports.createProject = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        const userId = JSON.parse(event.requestContext.authorizer.user).id;
        console.log(userId);
        projectService.createProject(event, userId, response =>{
            callback(null,response);
        })
    } catch (ex) {
        console.log(ex);
        callback(null, ex);
    }

}

module.exports.updateProject = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

}

module.exports.deleteProject = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

}