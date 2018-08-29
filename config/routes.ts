"use strict";

export const routes = [
    {
        path: "/",
        handler: "Controller/HomeController::handleAction",
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
