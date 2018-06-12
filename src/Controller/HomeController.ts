"use strict";

import {AbstractController} from "./AbstractController";

class HomeController extends AbstractController
{
    public handleAction()
    {
        this.response
            .status(200)
            .send("Welcome");
    }
}

module.exports = HomeController;