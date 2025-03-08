import statusCodes from "../utils/statusCodes";
import { Request, Response, NextFunction } from "express";
import { ExpressError } from "../utils/ExpressError";

const errorHandler = (err:any, req : Request, res : Response, next : NextFunction) => {
    console.error(`Error: `, err);

    if (!(err instanceof ExpressError)) {
        err = new ExpressError(err.message || "Internal Server Error", err.statusCode || 500, err);
    }

    const statusCode = err.statusCode || statusCodes["Server Error"] || 500;
    const message = err.message || "Something went wrong";

    res.status(statusCode).json({
        success: false,
        msg: message,
        error: process.env.NODE_ENV === "development" 
            ? err.error || err.stack || "No additional details"
            : undefined,
    });
}

export default errorHandler;