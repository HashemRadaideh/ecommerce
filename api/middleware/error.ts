import express from "express";

export const errorMiddleware: express.ErrorRequestHandler = (
  err: any,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};
