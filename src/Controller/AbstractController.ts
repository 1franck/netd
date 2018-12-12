import {Request, Response} from "express"

export abstract class AbstractController
{
    /**
     * @param {e.Request} request
     * @param {e.Response} response
     * @param next
     */
    constructor(
        protected request: Request,
        protected response: Response,
        protected next: any,
    ) {}

}
