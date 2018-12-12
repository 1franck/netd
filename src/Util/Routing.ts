import * as debugModule from "debug"
import {RouteDefinitionType, RouteType} from "./UtilType"
import {RouteBuilder} from "./Routing/RouteBuilder";
import {Request, Response} from "express";

let debug = debugModule('Util:Routing')

export class Routing
{
    constructor(private app: any) {}

    register(routeDef: RouteDefinitionType) {
        let route: RouteType = RouteBuilder.build(routeDef);

        this.app[route.method](route.path, (request: any, response: any, next: any) => {
            const controller = this.loadController(route, request, response, next)
            if (!controller[route.action]) {
                this.errorControllerActionNotFound(controller, route, response)
            } else {
                debug('Calling ' + controller.constructor.name + '::' + route.action + '() for request ' + request.originalUrl)
                controller[route.action]()
            }
        })
    }

    private errorControllerActionNotFound(controller: any, route: RouteType, response: Response) {
        let msg = controller.constructor.name + ' has no action named ' + route.action
        debug(msg)
        if (this.app.settings.env === 'development') {
            response.status(500).send(msg)
        } else {
            response.status(500).send('Something broke!')
        }
    }

    private loadController(route: RouteType, request: Request, response: Response, next: any): any {
        let controllerClass = require('./../' + route.controller)
        return new controllerClass(request, response, next)
    }
}