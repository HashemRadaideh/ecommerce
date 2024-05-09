import express from "express";

const api = express.Router();

api
  .route("/api/home")
  .get(async (_req: express.Request, res: express.Response) => {
    res.json({ message: "Hello, World!" });
  });

export default api;
