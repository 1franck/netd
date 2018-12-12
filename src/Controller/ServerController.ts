import {AbstractController} from "./AbstractController"

let debug = require("debug")("Controller:ServerController")

class ServerController extends AbstractController
{
    async statusAction() {
        this.response
            .status(200)
            .send("alive")
    }

    pageNotFoundAction() {
        this.response
            .status(404)
            .send("Page not found")
    }
}

module.exports = ServerController