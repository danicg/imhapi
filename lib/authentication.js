'use strict';

const Users = require('./users.json');
const Basic = require('hapi-auth-basic');

const internals = {};

exports.register = function (server, options, next) {

    server.register(Basic, (err) => {

        if (err){
            return next(err);
        }

        server.auth.strategy('simple', 'basic', { validateFunc: internals.validate });
    });

    return next();
};

internals.validate = function (request, username, password, callback){

    const user = Users[username];
    if (user && user.password === password) {
        return callback(null, true, user);
    }

    return callback(null, false);
};

exports.register.attributes = {
    name: 'Authentication'
};
