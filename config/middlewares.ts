"use strict";

import * as helmet from "helmet";
import * as compression from "compression";

export const middlewares = [
    helmet, // for security headers
    compression // for gzip compression
];
