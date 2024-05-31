import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import { auth } from "./routes/auth";
import { category } from "./routes/category";
import { product } from "./routes/product";
import { search } from "./routes/search";
import { users } from "./routes/users";

dotenv.config();

const api: express.Application = express();

// define api as json
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(compression());

// static directory
export const root = "out";
api.use(express.static(root));

// CORS: Cross Origin Resource Sharing
api.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN || "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  }),
);

// middleware
api.use(
  morgan(
    '[:date[web]] ":method :url HTTP/:http-version" :status :response-time ms',
  ),
);

// routes
api.use("/api/v1", auth, users, category, product, search);

api.listen(process.env.PORT || 8080, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} environment on ` +
      `http://localhost:${process.env.PORT || 8080}`,
  );
});
