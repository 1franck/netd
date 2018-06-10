'use strict';

import {Request, Response} from "express";

export abstract class AbstractController
{
    /**
     * Constructor
     * @param {e.Request} request
     * @param {e.Response} response
     * @param next
     */
    constructor(protected request: Request, protected response: Response, protected next: any) {}

    /**
     * Send error
     * @param {number} code
     * @param {string} msg
     */
    protected sendError(code: number = 500, msg: string = "Something broke")
    {
        this.response
            .status(code)
            .json({
                "errorMessage": msg
            });
    }

    /**
     * Send 404
     */
    protected send404()
    {
        this.sendError(404, "Page not found");
    }
}
