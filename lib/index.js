'use strict';

const Hapi = require('hapi');
const Version = require('./version');


exports.init = function (port, next) {

    const Server = new Hapi.Server();
    Server.connection({ port: port });

    Server.register(Version, (err) => {

        if (err) {
            return next(err);
        }

        Server.start((err) => {

            return next(err, Server);
        });
    });

};
