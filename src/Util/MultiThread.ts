"use strict";

import * as debugModule from "debug";
import * as cluster from "cluster";
import * as os from "os";

let debug = debugModule("MultiThread");

/**
 * Fork the process to use all machine cpus
 */
export default (function() {

    let threadCount = os.cpus().length,
        started = false;

    if (cluster.isMaster) {
        cluster.on("fork",  (worker: any) => {
            debug("Spawned worker with pid %s", worker.process.pid);
        });

        cluster.on("exit",  (worker: any, code: any, signal: any) => {
            debug("Worker with pid %s died with exit code %s and signal %s", worker.process.pid, code, signal);
            cluster.fork();
        });

        for (var i = 0; i < threadCount; i++) {
            cluster.fork();
        }
    } else {
        started = true;
    }
    return {
        isStarted: function() {
            return started;
        },
        cpus: function() {
            return threadCount;
        }
    }
})();