import {Request, Response} from "express";

export interface MiddlewareErrorHandlerInterface
{
    resolve(err: any, request: Request, response: Response, next: any): any;
}