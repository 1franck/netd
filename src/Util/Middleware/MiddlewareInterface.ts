import {Request, Response} from "express";

export interface MiddlewareInterface
{
    resolve(request: Request, response: Response, next: any): any;
}