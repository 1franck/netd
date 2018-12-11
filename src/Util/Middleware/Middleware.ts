"use strict"

import {MiddlewareInterface} from "./MiddlewareInterface"
import {MiddlewareErrorHandlerInterface} from "./MiddlewareErrorHandlerInterface"

let debug = require("debug")("Util:Middleware:Middleware")

export class Middleware
{
    /**
     * @param app
     */
    constructor(private app: any) {}

    /**
     * @param {string} middlewareName
     */
    public register(middlewareName: any)
    {
        if (typeof middlewareName === "string" || middlewareName instanceof String) {
            debug("Registering middle " + middlewareName);
            const middleware = require("./../../" + middlewareName)
            const middlewareInstance = new middleware()
            this.loadMiddleware(middlewareInstance)
        } else if(typeof middlewareName === "function") {
            this.app.use(middlewareName())
        }
    }

    /**
     * @param middleware
     */
    private loadMiddleware(middleware : MiddlewareInterface|MiddlewareErrorHandlerInterface)
    {
        this.app.use(middleware.resolve)
    }
}