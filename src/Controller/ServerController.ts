import {AbstractController} from "./AbstractController"

let debug = require("debug")("Controller:ServerController")

class ServerController extends AbstractController
{
    async statusAction() {
        this.response
            .status(200)
            .json({
            "status": 200,
            "message": "alive"
        })
    }

    pageNotFoundAction() {
        this.response
            .status(404)
            .send("Page not found")
    }
}

module.exports = ServerController