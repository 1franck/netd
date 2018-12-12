"use strict"

import {MiddlewareInterface} from "./MiddlewareInterface"
import {MiddlewareErrorHandlerInterface} from "./MiddlewareErrorHandlerInterface"

let debug = require("debug")("Util:Middleware:Middleware")

export class Middleware
{
    constructor(private app: any) {}

    register(middlewareName: any) {
        if (typeof middlewareName === "string" || middlewareName instanceof String) {
            debug("Registering middle " + middlewareName);
            const middleware = require("./../../" + middlewareName)
            const middlewareInstance = new middleware()
            this.loadMiddleware(middlewareInstance)
        } else if(typeof middlewareName === "function") {
            this.app.use(middlewareName())
        }
    }

    private loadMiddleware(middleware : MiddlewareInterface|MiddlewareErrorHandlerInterface) {
        this.app.use(middleware.resolve)
    }
}