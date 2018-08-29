'use strict';

import {Request, Response} from "express";
import {HttpError} from "../Util/Http/HttpError";
import {ContainerInterface} from "../Util/Container/ContainerInterface";

export abstract class AbstractController
{

    private defaultErrorMessage = "Something broke";

    /**
     *
     * @param {e.Request} request
     * @param {e.Response} response
     * @param next
     * @param {ContainerInterface} container
     */
    constructor(
        protected request: Request,
        protected response: Response,
        protected next: any,
        protected container: ContainerInterface
    ) {}

    /**
     * Send Error
     * @param {any} err
     * @param {number} code
     */
    protected sendError(err: any, code: number = 500)
    {
        let json: {[k: string]: any} = {};
        json.status = code;

        if (err instanceof HttpError) {
            json = {};
            json.status = err.statusCode();
            json.message = err.getMessage();
            if (process.env.ENV === "dev") {
                json.url = err.getUrl();
            }
        } else if(err instanceof Error) {
            json.message = err.toString();
        }

        if (process.env.ENV !== "dev") {
            json.message = this.defaultErrorMessage;
        }

        this.response.status(code).json(json);
    }

    /**
     * Send 404
     */
    protected send404()
    {
        this.sendError("Page not found", 404);
    }
};
