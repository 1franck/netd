import {Request, Response} from "express"
import {MiddlewareErrorHandlerInterface} from "../Util/Middleware/MiddlewareErrorHandlerInterface"

class ErrorHandlerMiddleware implements MiddlewareErrorHandlerInterface
{
    public resolve(err: any, request: Request, response: Response, next: any): any {
        let msg = "Something broke!"
        if (process.env.NODE_ENV === 'development') {
            msg = err.toString()
        } else {
            console.error(err.stack)
        }
        response.status(500).send(msg)
    }
}

module.exports = ErrorHandlerMiddleware