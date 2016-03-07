'use strict';

const Vision = require('vision');

const internals = {
    path: '../views'
};

exports.register = function (server, options, next) {

    server.register(Vision, (err) => {

        if (err){
            return next(err);
        }

        server.views({
            engines: {
                html: require('handlebars')
            },
            relativeTo: __dirname,
            path: internals.path
        });

        server.route({
            method: 'GET',
            path: '/home',
            config: {
                description: 'Devuelve la página home',
                handler: {
                    view: {
                        template: 'home',
                        context: {
                            path: internals.path
                        }
                    }
                }
            }
        });
    });

    return next();
};

exports.register.attributes = {
    name: 'Home'
};
