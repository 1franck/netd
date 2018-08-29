import {server} from "./server";
import {database} from "./database";
import {redis} from "./redis";
import {routes} from "./routes";
import {middlewares} from "./middlewares";
import {resources} from "./resources";

// third-party middleware reference, if not specified, cannot start the app
import * as helmet from "helmet";
import * as compression from "compression";

export const config = {
  server,
  routes,
  middlewares,
  database,
  redis,
  resources,
};
