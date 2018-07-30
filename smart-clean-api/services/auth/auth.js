'use strict'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const connectToDatabase = require('../../connect');
const User = require('../../models/userModel');
const userActions = require('../users/userService');

module.exports.login = (email, password, callback) => {
    if(!email || !password) {
        throw new Error('username or password not present');
    }

    connectToDatabase()
        .then(() => {
            User.findOne({email: email})
                .then(user => {
                    if(!user.verified) {
                        callback({
                            statusCode: 401,
                            body: JSON.stringify({
                                err: 'User is not verfied',
                                username: user.email 
                            }),
                            headers: {
                                "Access-Control-Allow-Origin": "*" 
                            }
                        });
                    }
                    const validate = bcrypt.compareSync(password, user.password);
                    if(!validate) {
                        callback({
                            statusCode: 401,
                            body: JSON.stringify({
                                error: 'username or password is incorrect',
                                username: user.email
                            }),
                            headers: {
                                "Access-Control-Allow-Origin": "*" 
                            }
                        }) 
                    }
                    const token = jwt.sign(
                        {id: user._id, username: user.email},
                        process.env.JWT_SECRET, {expiresIn: 86400});
                        callback({
                            statusCode: 200,
                            body: JSON.stringify({
                                auth: true,
                                token: token,
                                username: user.email
                            }),
                            headers: {
                                "Access-Control-Allow-Origin": "*" 
                            }
                        });
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
                callback({
                    statusCode: 201,
                    body: JSON.stringify({
                        auth: true,
                        username: user.email,
                        message: 'User successfully created'
                    }),
                    headers: {
                        "Access-Control-Allow-Origin": "*" 
                    }
                }) 
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

