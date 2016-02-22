'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');
const PackageJson = require('../package.json');

const internals = {
    response : {
        version :  PackageJson.version
    }
};

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || '8000' });

server.route({
    method: 'GET',
    path: '/version',
    handler: function (request, reply) {

        return reply(internals.response);
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    Hoek.assert(!err, err);

    console.log('Server running at:', server.info.uri);
});
