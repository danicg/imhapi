'use strict';

const Basic = require('hapi-auth-basic');
const Users = require('./users.json');

const internals = {};

exports.register = function (server, options, next){

    server.register(Basic, (err) => {

        if (err){
            return next(err);
        }

        server.auth.strategy('simple', 'basic', { validateFunc: internals.validate });

        server.route({
            method: 'GET',
            path: '/private',
            config: {
                description: 'Devuelve el nombre del usuario autenticado',
                auth: 'simple',
                handler: function (request, reply) {

                    return reply(internals.response(request.auth.credentials.username));
                }
            }
        });

        return next();
    });

};

exports.register.attributes = {
    name: 'Private'
};

internals.validate = function (request, username, password, callback){

    const user = Users[username];
    if (user && user.password === password) {
        return callback(null, true, user);
    }

    return callback(null, false);
};

internals.response = function (userName){

    return '<center>Hola ' + userName + '</center>';
};
