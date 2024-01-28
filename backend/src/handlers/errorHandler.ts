import { Request, Response, NextFunction, query } from "express";

export function apiErrorHandler(
  err: any,
  req: Request,
  res: Response,
  message: string
) {
  const error: object = { Message: message, Request: req, Stack: err };
  res.json(
    process.env.APP_ENV == "dev" || process.env.APP_ENV == "local"
      ? {
          error: true,
          details: {
            message: message,
            request: {
              body: req.body,
              query: req.query,
              params: req.params,
              headers: req.headers,
            },
            report: err,
          },
        }
      : {
          error: true,
          details: {
            message: message,
          },
        }
  );
}
