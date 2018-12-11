import {Request, Response} from "express"
import {MiddlewareErrorHandlerInterface} from "../Util/Middleware/MiddlewareErrorHandlerInterface"

class ErrorHandlerMiddleware implements MiddlewareErrorHandlerInterface
{
    /**
     * @param err
     * @param request
     * @param response
     * @param next
     */
    public resolve(err: any, request: Request, response: Response, next: any): any
    {
        let msg = "Something broke!"
        if (process.env.NODE_ENV === 'development') {
            msg = err.toString()
        } else {
            console.error(err.stack)
        }
        response.status(500).json({
            "status": 500,
            "message": msg
        })
    }
}

module.exports = ErrorHandlerMiddleware