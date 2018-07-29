'use strict'

const connectToDatabase = require('../../connect');
const User = require('../../models/userModel');

/**
 * Find the user by their ID and return the user object
 * @param {*} id 
 * @param {*} callback 
 */
module.exports.userLookupById = (id) => {
    return connectToDatabase()
        .then(() => {
            User.findById(id)
                .catch(err => {
                    console.error(err);
                    throw new Exception(err);
                })
        });
  }