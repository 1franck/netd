import * as express from "express"
import * as debugModule from "debug"
import multiThread from "./Util/MultiThread"
import {config} from "../config"
import {Routing} from "./Util/Routing"
import {Middleware} from "./Util/Middleware/Middleware"

let debug = debugModule("main"),
    app = express(),
    routing = new Routing(app),
    middleware = new Middleware(app)

app.use(express.json())

if (multiThread.isStarted()) {

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