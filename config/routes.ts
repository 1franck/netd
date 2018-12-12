"use strict";

import {RouteDefinitionType} from "../src/Util/UtilType";

export const routes: Array<RouteDefinitionType> = [
    {
        path: "/",
        handler: "Controller/HomeController",
    },
    {
        path: "/status",
        handler: "Controller/ServerController::statusAction",
    },
    {
        path: "*",
        method: "all",
        handler: "Controller/ServerController::pageNotFoundAction",
    },
];
