/**
 * @class Authentication Service
 * Contains the main logic to be used in the authentication of the API
 */

'use strict'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const connectToDatabase = require('../../connect');
const User = require('../../models/userModel');
const userActions = require('../users/userService');

const standardResponse = require('../utils/apiUtils').standardResponse;

/**
 * Main login method that requires an email and password will return a callback
 * containing the relevent response either 200 or 401
 * @param {*} email string user email used to sign up with
 * @param {*} password string user password which is verified against the bcrypt database hash
 * @param {*} callback response already mapped to the aws lambda state
 */
module.exports.login = (email, password, callback) => {
    if(!email || !password) {
        throw new Error('username or password not present');
    }

    connectToDatabase()
        .then(() => {
            User.findOne({email: email})
                .then(user => {
                    if(!user) {
                        callback(standardResponse(401,{
                            error: 'username or password is incorrect',
                            username: email
                        }))
                    }
                    if(!user.verified) {
                        callback(standardResponse(401,{
                            error: 'User is not verfied',
                            username: user.email
                        }))
                    }
                    const validate = bcrypt.compareSync(password, user.password);
                    if(!validate) {
                        callback(standardResponse(401,{
                            error: 'username or password is incorrect',
                            username: user.email
                        }))
                    }
                    const token = jwt.sign(
                        {id: user._id, username: user.email},
                        process.env.JWT_SECRET, {expiresIn: 86400});
                        callback(standardResponse(200,{
                            auth: true,
                            token: token,
                            username: user.email
                        }))
                })
        })
};

/**
 * Register a new user
 * takes the httpEvent and pulls the body checking it has all the
 * fields required
 * then it will hash the password and setup the unverified version
 * of the user in the database
 * @param {*} event httpEvent from server
 * @param {*} callback aws lambda callback encoded
 */
module.exports.register = (event, callback) => {
    const {firstname, lastname, companyName, email, password} = JSON.parse(event.body);

    if(!firstname || !lastname || !companyName || !email || !password) {
        throw new Error('missing fields');
    }

    const hashedPass = bcrypt.hashSync(password, 8);

    connectToDatabase()
        .then(() => {
            User.create({
                firstname: firstname,
                lastname: lastname,
                companyName: companyName,
                email: email,
                password: hashedPass,
                verified: false
            })
            .then(user => {
                callback(standardResponse(201,{
                    auth: true,
                    username: user.email,
                    message: 'User successfully created'
                }))
            })
        })
}

/**
 * Authorisation method
 * This method is used to check that the JWT token is valid
 * and the user is able to access the resource
 * currently basic implementation, can be expanded upon
 * to have extra policies as required
 * @param {*} token 
 * @param {*} event 
 * @param {*} callback 
 */
module.exports.isUserAuthorised = (token, event, callback) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    console.log(decoded);

    userActions.userLookupById(userId, user => {
        const isAllowed = 'Allow';
        const authContext = {user: JSON.stringify({ id: user._id, username: user.email, firstname: user.firstname, lastname: user.lastname})};
        const policy = buildIAMPolicy(userId, isAllowed, event.methodArn, authContext);
        callback(policy); 
    })

}

// Method that is used to setup the AWS policy management section to be sent
const buildIAMPolicy = (userId, effect, resource,context) => {
    const policy = {
        principalId: userId,
        policyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Action: 'execute-api:Invoke',
              Effect: effect,
              Resource: resource,
            },
          ],
        },
        context,
    };
    
    return policy;
}

