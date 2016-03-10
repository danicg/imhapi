'use strict';

const Code = require('code');
const Lab = require('lab');
const Server = require('../lib/index');
const Vision = require('vision');

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
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
            plugin: './home'
        },
        {
            plugin: 'vision'
        }
    ]
};

describe('/home', () => {

    it('Devuelve un texto con la ruta de las views', (done) => {

        Server.init(internals.manifest, internals.options, (err, server) => {

            expect(err).to.not.exist();
            server.inject('/home', (res) => {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.deep.equal('<center>La Homeeeeeeeeeeeeeeeeee en ../views</center>\n');
                server.stop(done);
            });
        });
    });

    it('Error en el plugin de vision', { parallel: false }, (done) => {

        const orig = Vision.register;
        Vision.register = function (server, options, next) {

            Vision.register = orig;
            return next(new Error('fallo plugin vision'));
        };

        Vision.register.attributes = {
            name: 'fake vision'
        };

        Server.init(internals.manifest, internals.options, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.equal('fallo plugin vision');
            return done();
        });
    });
});
