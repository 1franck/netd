'use strict'

import * as express from "express"
import * as debugModule from "debug"
import multiThread from "./Util/MultiThread"
import {config} from "../config"
import services from "./services"
import {Routing} from "./Util/Routing"
import {Middleware} from "./Util/Middleware/Middleware"
import {Container} from "./Util/Container/Container"

let debug = debugModule("main"),
    container = new Container(),
    app = express(),
    routing = new Routing(app, container),
    middleware = new Middleware(app)

routing.setDefaultMethod("get")
app.use(express.json())

if (multiThread.isStarted()) {

    // init services
    services.setup(container)

    // register general middlewares
    config.middlewares.forEach((middlewareName: any) => {
        middleware.register(middlewareName)
    });

    // register routes in routes
    config.routes.forEach((route: any) => {
        //debug("[pid #" + process.pid + "] Registering route " + JSON.stringify(route));
        routing.register(route)
    });

    // register at the end an error handler middleware
    middleware.register("Middleware/ErrorHandlerMiddleware")

    // start the app
    let listener:any = app.listen(config.server.port, () => {
        console.log("App started on pid #" + process.pid + ", listening on port " + listener.address().port)
        app.emit('appStarted')
    });
}

module.exports = app