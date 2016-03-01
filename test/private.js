'use strict';

const Code = require('code');
const Lab = require('lab');
const Server = require('../lib/index');
const Basic = require('hapi-auth-basic');

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

const internals = {};


describe('/private', () => {

    it('Usuario autenticado', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();

            server.inject(internals.request('user1', 'pass1'), (res) => {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.equal('<center>Hola user1</center>');
                server.stop(done);
            });
        });
    });

    it('Usuario no existe', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();

            server.inject(internals.request('ningun user', 'pass1'), (res) => {

                expect(res.statusCode).to.equal(401);
                server.stop(done);
            });
        });
    });

    it('Usuario existe pero password erroneo', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();

            server.inject(internals.request('user1', 'esta todo mal'), (res) => {

                expect(res.statusCode).to.equal(401);
                server.stop(done);
            });
        });
    });

    it('Error en el plugin de autenticacion', { parallel: false }, (done) => {

        const orig = Basic.register;
        Basic.register = function (server, options, next) {

            Basic.register = orig;
            return next(new Error('fallo plugin autenticacion'));
        };

        Basic.register.attributes = {
            name: 'fake autenticacion'
        };

        Server.init(0, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.equal('fallo plugin autenticacion');
            done();
        });
    });
});

internals.request = function (username, password){

    return {
        url: '/private',
        headers: {
            authorization: 'Basic ' + (new Buffer(username + ':' + password)).toString('base64')
        }
    };
};
