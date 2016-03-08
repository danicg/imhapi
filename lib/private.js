'use strict';

const Authentication = require('./authentication');

const internals = {};

exports.register = function (server, options, next){

    server.register(Authentication, (err) => {

        if (err){
            return next(err);
        }

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

internals.response = function (userName){

    return '<center>Hola ' + userName + '</center>';
};
