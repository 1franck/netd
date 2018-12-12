import {server} from "./server";
import {database} from "./database";
import {redis} from "./redis";
import {routes} from "./routes";
import {middlewares} from "./middlewares";
import {resources} from "./resources";

export const config = {
  server,
  routes,
  middlewares,
  database,
  redis,
  resources,
};
