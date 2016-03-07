'use strict';

const Hoek = require('hoek');
const Server = require('./index');
const Manifest = require('./manifest.json');

const internals = {};
Manifest.connections[0].port = process.env.PORT || '8000';

internals.options = {
    relativeTo: __dirname
};

Server.init(Manifest, internals.options, (err, server) => {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});
