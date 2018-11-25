import { NextFunction, Request, Response } from "express";

export function ReqLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log("Request " + req.url);
    next();
}
