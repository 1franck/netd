import {AbstractController} from "./AbstractController"

let debug = require("debug")("Controller:HomeController")

class HomeController extends AbstractController
{
    indexAction() {
        this.response.send('Ok')
    }
}

module.exports = HomeController