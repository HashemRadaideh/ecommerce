import express from "express";

export const loggingMiddleware = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction,
) => {
  console.log(
    `[${new Date().toISOString()}] [INFO] ` +
      `${req.ip} ${req.method} ${req.originalUrl}`,
  );
  next();
};

export const errorMiddleware: express.ErrorRequestHandler = (
  err: any,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};
