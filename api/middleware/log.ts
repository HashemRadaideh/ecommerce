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
