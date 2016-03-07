'use strict';

const Glue = require('glue');

exports.init = function (manifest, options, next) {

    Glue.compose(manifest, options, (err, server) => {

        if (err) {
            return next(err);
        }

        server.start((err) => {

            return next(err, server);
        });
    });

};
