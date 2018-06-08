'use strict';

import * as express from "express";
import * as debugModule from 'debug';
import * as helmet from "helmet";
import * as compression from "compression";
import multiThread from "./Util/MultiThread";
import {config} from "./config";
import {Routing} from "./Util/Routing";

var debug = debugModule('main'),
    app = express(),
    routing = new Routing(app);

app.use(helmet()); // for security headers
app.use(compression()) // for gzip compression

/**
 * Start the hole thing
 */
if (multiThread.isStarted()) {

    // register routes in routes
    config.routes.forEach((route: any) => {
        routing.register(route);
    });

    // send 404 to unknown routes
    app.get('*', (request: any, response: any) => {
        response.status(404).send('Not Found');
    });

    app.listen(config.server.port, '0.0.0.0');
    console.info('App started on pid #' + process.pid + ', port ' + config.server.port);
}