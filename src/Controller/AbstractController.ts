'use strict';

import {Request, Response} from "express";

export abstract class AbstractController {

    constructor(protected request: Request, protected response: Response) {}

    /**
     * Send error
     * @param {number} code
     * @param {string} msg
     */
    protected sendError(code: number = 500, msg: string = "Something broke")
    {
        this.response.status(code).json({
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
};
