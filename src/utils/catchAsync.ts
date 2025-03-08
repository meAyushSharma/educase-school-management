import { ExpressError } from "./ExpressError";
import { Request, Response, NextFunction } from "express";

const catchAsync = (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next);
        } catch (err: any) {
            console.error("Async error caught:", err);

            if (!res.headersSent) {
                next(err instanceof ExpressError ? err : new ExpressError(err.message || "Server Error", 500));
            }
        }
    };
};

export default catchAsync;
