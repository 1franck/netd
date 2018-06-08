import {server} from "../config/server";
import {mysql} from "../config/mysql";
import {redis} from "../config/redis";
import {routes} from "../config/routes";

export const config = {
    server,
    routes,
    redis,
    mysql,
};
