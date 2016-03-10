'use strict';

//const Authentication = require('./authentication');

const internals = {};

exports.register = function (server, options, next){

    server.dependency('Authentication', (server, next) => {

        server.route({
            method: 'GET',
            path: '/private',
            config: {
                description: 'Devuelve el nombre del usuario autenticado',
                auth: 'basic',
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

internals.response = function (userName){

    return '<center>Hola ' + userName + '</center>';
};
