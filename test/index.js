'use strict';

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const Server = require('../lib');
const Manifest = require('../lib/manifest.json');
const Version = require('../lib/version');
const Private = require('../lib/private');
const Home = require('../lib/home');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const it = lab.test;

const internals = {
    options: {
        relativeTo: __dirname + '../../lib'
    }
};
Manifest.connections[0].port = '0';

it('Arranca servidor y devuelve el server', (done) => {

    Server.init(Manifest, internals.options, (err, server) => {

        expect(err).to.not.exist();
        expect(server).to.be.instanceof(Hapi.Server);
        server.stop(done);
    });
});

it('Arranca el servidor en el puerto especificado', (done) => {

    const copyManifest = JSON.parse(JSON.stringify(Manifest));
    copyManifest.connections[0].port = '8000';
    Server.init(copyManifest, internals.options, (err, server) => {

        expect(err).to.not.exist();
        expect(server.info.port).to.equal(8000);
        server.stop(done);
    });
});

it('Test de error plugin de version', { parallel: false }, (done) => {

    const orig = Version.register;

    Version.register = function (server, options, next) {

        Version.register = orig;
        return next(new Error('register version failed'));
    };

    Version.register.attributes = {
        name: 'fake version'
    };

    Server.init(Manifest, internals.options, (err, server) => {

        expect(err).to.exist();
        expect(err.message).to.equal('register version failed');
        done();
    });
});

it('Test de error plugin private', { parallel: false }, (done) => {

    const orig = Private.register;

    Private.register = function (server, options, next) {

        Private.register = orig;
        return next(new Error('register private failed'));
    };

    Private.register.attributes = {
        name: 'fake private'
    };

    Server.init(Manifest, internals.options, (err, server) => {

        expect(err).to.exist();
        expect(err.message).to.equal('register private failed');
        done();
    });
});

it('Test de error plugin home', { parallel: false }, (done) => {

    const orig = Home.register;

    Home.register = function (server, options, next) {

        Home.register = orig;
        return next(new Error('register home failed'));
    };

    Home.register.attributes = {
        name: 'fake home'
    };

    Server.init(Manifest, internals.options, (err, server) => {

        expect(err).to.exist();
        expect(err.message).to.equal('register home failed');
        done();
    });
});
