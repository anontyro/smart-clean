'use strict'

const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    /** List of users that this project belongs to */
    userId : [{type: String}],
    /** List of location ids this project relates to */
    locationId: [{type: String}],
    /** project id name */
    pid: {type: String, required: true},
    /** Display name for the project */
    display_name: {type: String, required: true},
    /** Auto added by the database to record when this record was created */
    created: {
        type: Date,
        default: Date.now
    },
}, {collection: 'smart_clean_projects'});

module.exports = mongoose.model('Project', projectSchema);