'use strict'

const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
    /** List of users that this project belongs to */
    id : {type: String},
    /** List of location ids this project relates to */
    deviceType: {type: String},
    /** project id name */
    display_name: {type: String, required: true},
    /** Auto added by the database to record when this record was created */
    created: {
        type: Date,
        default: Date.now
    },
}, {collection: 'smart_clean_devices'});

module.exports = mongoose.model('User', userSchema);