'use strict'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const connectToDatabase = require('../../connect');
const User = require('../../models/userModel');
const userActions = require('../users/userService');

const standardResponse = require('../utils/apiUtils').standardResponse;

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

