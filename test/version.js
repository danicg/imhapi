'use strict';

const Code = require('code');
const Lab = require('lab');
const Server = require('../lib/index');
const PackageJSON = require('../package.json');

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('/version', () => {

    it('Devuelve la versión del package.json', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();
            server.inject('/version', (res) => {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.deep.equal({ version: PackageJSON.version });
                server.stop(done);
            });
        });
    });
});
