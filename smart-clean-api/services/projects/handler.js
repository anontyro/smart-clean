/**
 * @class Project Handler
 * Main mapping class to map the project service to the endpoints
 */
'use strict';
const projectService = require('./projectService');

/**
 * Get Project By UserId
 * gets the userId from the token and uses it to lookup the projects in the database
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
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

/**
 * Get Complete Project
 * requires projectId and then will return a full version of the project mapped accordingly
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
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

/**
 * Create A New Project
 * requires a project object in the body and will add it to the database
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
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

/**
 * Update A Project
 * requires a project in the body to be used to update the database
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
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
/** Not Implemented */
module.exports.deleteProject = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

}