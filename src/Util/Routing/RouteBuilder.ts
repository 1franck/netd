import {RouteDefinitionType, RouteType} from "../UtilType";

export class RouteBuilder
{
    static defaultMethod: string = 'all'
    static defaultControllerAction: string = 'indexAction'

    static build(routeDef: RouteDefinitionType): RouteType {
        let handler = routeDef.handler.split("::"),
            controller = handler[0],
            action = handler[1] === undefined ? RouteBuilder.defaultControllerAction : handler[1]

        const route: RouteType = {
            path: routeDef.path,
            method: routeDef.method || RouteBuilder.defaultMethod,
            controller: controller,
            action: action,
        }

        return route
    }
}
