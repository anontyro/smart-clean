'use strict'

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    /** First name of the person to add */
    id: {type: String, required: true},
    /** last name of the preson to add */
    display_name: {type: String, required: true},
    /** List of device ids */
    devicesId: [{type: String}],
    /** Auto added by the database to record when this record was created */
    created: {
        type: Date,
        default: Date.now
    },
}, {collection: 'smart_clean_locations'});

module.exports = mongoose.model('User', userSchema);