var mySqlDriver = require("mysql"),
    debug = require("debug")("Util:MySQL");

export class MySQL {

    /**
     * MySql connections pool
     */
    private pool: any;

    /**
     * Constructor
     * @param configuration
     */
    constructor(private configuration: any)
    {
        this.pool  = mySqlDriver.createPool({
            host : configuration.host,
            port : configuration.port,
            user : configuration.user,
            password : configuration.password,
            database : configuration.database,
            charset : configuration.charset,
            connectionLimit: 10,
        });

        this.bindPoolEvents();
    }

    /**
     * Bind Pool events
     */
    private bindPoolEvents(): void
    {
        /**
         * Pool events
         */
        this.pool.on('acquire', (connection: any) => {
            debug('Connection %d acquired', connection.threadId);
        });

        this.pool.on('connection', (connection: any) => {
            connection.query('SET SESSION auto_increment_increment=1')
        });

        this.pool.on('enqueue', () => {
            debug('Waiting for available connection slot');
        });

        this.pool.on('release', (connection: any) => {
            debug('Connection %d released', connection.threadId);
        });

    }

    /**
     * Retrieve a connection form the pool
     * @param callbackSuccess
     * @param callbackError
     */
    public getConnection(callbackSuccess: any, callbackError: any) {
        this.pool.getConnection((err: any, connection: any) => {
            if (err) {
                callbackError(err);
            } else {
                callbackSuccess(connection);
            }
        });
    }

    /**
     * Wrap getConnection and query into one call
     * @param {string} query
     * @param {Array<any>} binding
     * @param callbackSuccess
     * @param callbackError
     */
    query(query: string, binding: Array<any>, callbackSuccess: any, callbackError: any) {
        this.getConnection((conn: any) => {
            conn.query(query, binding, (error: any, results: any, fields: any) => {
                // And done with the connection.
                conn.release();
                // Handle error after the release.
                if (error) {
                    callbackError(error);
                }
                callbackSuccess(results, fields);
            });
        }, (error:any) => {
            callbackError(error)
        });
    };
}