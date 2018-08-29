'use strict';

import * as debugModule from 'debug';
import * as cluster from "cluster";
import * as os from "os";

let debug = debugModule('Util:MultiThread');

export default (function() {

    // in case we are testing app, we don't want to fork process because it screw mocha flow
    if (process.env.ENV === 'test') {
        return {
            isStarted: function() {
                return true;
            }
        }
    }

    let threadCount = os.cpus().length,
        started = false;

    if (cluster.isMaster) {
        cluster.on('fork', function (worker: any) {
            debug('Spawned worker with pid %s', worker.process.pid);
        });

        cluster.on('exit', function (worker: any, code: any, signal: any) {
            debug('Worker with pid %s died with exit code %s and signal %s', worker.process.pid, code, signal);
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