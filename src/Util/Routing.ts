'use strict';

import * as debugModule from "debug"
import {ContainerInterface} from "./Container/ContainerInterface"

let debug = debugModule('Util:Routing')

export class Routing
{

    private defaultMethod: string = 'all'
    private defaultControllerAction: string = 'handle'

    constructor(
        private app: any,
        private container: ContainerInterface
    ) {}

    /**
     * Register a new route for express
     * @param route {{path: string, method: string, controller: string, action: string}}
     */
    public register(route: any)
    {
        route = this.processRoute(route);

        this.app[route.method](route.path, (request: any, response: any, next: any) => {

            const controller = this.loadController(route, request, response, next)

            if (!controller[route.action]) {
                this.errorControllerActionNotFound(controller, route, response)
            } else {
                debug('Calling ' + controller.constructor.name + '::' + route.action + '() for request ' + request.originalUrl)
                controller[route.action]();
            }
        });
    }

    /**
     * @param {string} methodName
     */
    public setDefaultMethod(methodName: string)
    {
        this.defaultMethod = methodName
    }

    /**
     * @param {string} actionName
     */
    public setDefaultControllerAction(actionName: string)
    {
        this.defaultControllerAction = actionName
    }

    /**
     * @param route
     * @returns {string}
     */
    private getMethod(route: any)
    {
        return route.method === undefined ? this.defaultMethod : route.method
    }

    /**
     * @param route
     * @returns {{path: string, method: string, controller: string, action: string}}
     */
    private processRoute(route: any): any
    {
        let handler = route.handler.split("::"),
            controller = handler[0],
            action = handler[1] === undefined ? this.defaultControllerAction : handler[1]

        return {
            path: route.path,
            method: this.getMethod(route),
            controller: controller,
            action: action,
        }
    }

    /**
     * @param controller
     * @param processedRoute
     * @param response
     */
    private errorControllerActionNotFound(controller: any, processedRoute: any, response: any)
    {
        let msg = controller.constructor.name + ' has no action named ' + processedRoute.action
        debug(msg)
        if (this.app.settings.env === 'development') {
            response.status(500).send(msg)
        } else {
            response.status(500).send('Something broke!')
        }
    }

    /**
     *
     * @param processedRoute
     * @param request
     * @param response
     * @param next
     * @returns {any}
     */
    private loadController(processedRoute: any, request: any, response: any, next: any): any
    {
        let controllerClass = require('./../' + processedRoute.controller)
        return new controllerClass(request, response, next, this.container)
    }
}