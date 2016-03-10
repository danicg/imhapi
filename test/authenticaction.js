'use strict';

const Code = require('code');
const Lab = require('lab');
const Server = require('../lib/index');
const Basic = require('hapi-auth-basic');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const it = lab.test;

const internals = {
    options: {
        relativeTo: __dirname + '../../lib'
    }
};

internals.manifest = {
    connections: [
        {
            port: 0
        }
    ],
    registrations: [
        {
            plugin: './authentication'
        },
        {
            plugin: 'hapi-auth-basic'
        }
    ]
};

it('Error en el plugin de autenticacion', { parallel: false }, (done) => {

    const orig = Basic.register;
    Basic.register = function (server, options, next) {

        Basic.register = orig;
        return next(new Error('fallo plugin autenticacion'));
    };

    Basic.register.attributes = {
        name: 'fake autenticacion'
    };

    Server.init(internals.manifest, internals.options, (err, server) => {

        expect(err).to.exist();
        expect(err.message).to.equal('fallo plugin autenticacion');
        done();
    });
});
