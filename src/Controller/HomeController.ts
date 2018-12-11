"use strict"

import {AbstractController} from "./AbstractController"

let debug = require("debug")("Controller:HomeController")

/**
 * Class ResolverController
 */
class HomeController extends AbstractController
{
    /**
     * Handle Action
     */
    public handleAction()
    {
        throw Error('fuck')
        this.response.send('Ok')
    }
}

module.exports = HomeController