'use strict';
const projectService = require('./projectService');

module.exports.getProjectsByUserId = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        const userId = JSON.parse(event.requestContext.authorizer.user).id;
        projectService.getProjectsByUserId(userId, response =>{
            callback(null,response);
        })
    } catch (ex) {
        console.log(ex);
        callback(null, ex);
    }   

}

module.exports.getProject = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        const projectId = event.pathParameters.projectId;
        projectService.getCompleteProject(projectId)
            .then(p => {
                console.log('project ready');
                callback(null, p);
            });

    } catch (ex) {
        console.log(ex);
        callback(null, ex);
    }  

}

module.exports.createProject = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        const userId = JSON.parse(event.requestContext.authorizer.user).id;
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

    try{
        projectService.updateProject(event, response =>{
            callback(null,response);
        })
    } catch (ex) {
        console.log(ex);
        callback(null, ex);
    }

}

module.exports.deleteProject = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

}