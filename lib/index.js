'use strict';

const Hapi = require('hapi');
const Version = require('./version');
const Private = require('./private');


exports.init = function (port, next) {

    const Server = new Hapi.Server();
    Server.connection({ port: port });

    Server.register([Version, Private], (err) => {

        if (err) {
            return next(err);
        }

        Server.start((err) => {

            return next(err, Server);
        });
    });

};
