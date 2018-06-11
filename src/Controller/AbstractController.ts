'use strict';

import {Request, Response} from "express";

export abstract class AbstractController
{

    private defaultErrorMessage = "Something broke";

    /**
     * @param {e.Request} request
     * @param {e.Response} response
     * @param next
     */
    constructor(protected request: Request, protected response: Response, protected next: any) {}

    /**
     * Send Error
     * @param {string} msg
     * @param {number} code
     */
    protected sendError(msg: any, code: number = 500)
    {
        if (typeof msg === "object" && typeof msg["toString"] === "function") {
            msg = msg.toString();
        }

        this.response.status(code).json({
            "status": code,
            "message": (process.env.ENV !== "dev") ? this.defaultErrorMessage : msg
        });
    }

    /**
     * Send 404
     */
    protected send404()
    {
        this.response.status(404).json({
            "status": 404,
            "message": "Page not found"
        });
    }
};
