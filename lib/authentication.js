'use strict';

const Users = require('./users.json');

const internals = {};

exports.register = function (server, options, next) {

    server.dependency('hapi-auth-basic', (server, next) => {

        server.auth.strategy('basic', 'basic', { validateFunc: internals.validate });
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
