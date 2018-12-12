import {Request, Response} from "express"

export abstract class AbstractController
{
    constructor(
        protected request: Request,
        protected response: Response,
        protected next: any,
    ) {}
}
