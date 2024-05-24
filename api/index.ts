import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import { auth } from "./routes/auth";
import { categories } from "./routes/categories";
import { category } from "./routes/category";
import { product } from "./routes/product";
import { products } from "./routes/products";
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
api.use(cookieParser());
api.use(
  morgan(
    '[:date[web]] :remote-addr :referrer ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms',
  ),
  // morgan("common"),
);

// routes
api.use("/api/v1", auth, users, category, categories, product, products);

api.listen(process.env.EXPRESS_PORT || 8080, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} environment on ` +
      `http://localhost:${process.env.EXPRESS_PORT || 8080}`,
  );
});
