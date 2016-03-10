'use strict';

const internals = {
    path: '../views'
};

exports.register = function (server, options, next) {

    server.dependency('vision', (server, next) => {

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
