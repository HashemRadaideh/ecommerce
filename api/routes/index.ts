import { root } from "..";
import express from "express";
import path from "path";

const home = express.Router();

home.route("/").get(async (_req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve(root, "index.html"));
});

export default home;
