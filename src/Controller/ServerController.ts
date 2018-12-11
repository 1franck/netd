"use strict"

import {AbstractController} from "./AbstractController"

let debug = require("debug")("Controller:ServerController")

/**
 * ServerController
 */
class ServerController extends AbstractController
{
    /**
     * Status
     */
    public async statusAction()
    {
        this.response.status(200).json({
            "status": 200,
            "message": "alive"
        })
    }

    /**
     * Page not found
     */
    public pageNotFoundAction()
    {
        this.response.status(404).json({
            "status": 404,
            "message": "Page not found"
        })
    }
}

module.exports = ServerController