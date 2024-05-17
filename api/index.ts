import { loggingMiddleware, errorMiddleware } from "./middleware";
import { auth } from "./routes/api/auth";
import { categories } from "./routes/api/categories";
import { category } from "./routes/api/category";
import { product } from "./routes/api/product";
import { products } from "./routes/api/products";
import { users } from "./routes/api/users";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";

dotenv.config();

const app: express.Application = express();

// define api as json
app.use(express.json());

// static directory
export const root = "out";
app.use(express.static(root));

// cors: cross origin resource sharing
app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN || "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
  }),
);

// middleware
app.use(loggingMiddleware, errorMiddleware);

// routes
app.use(auth);
app.use(users);
app.use(category);
app.use(categories);
app.use(product);
app.use(products);

const server = http.createServer(app);

server.listen(process.env.PORT || 8080, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} environment on ` +
      `http://${process.env.HOST || "localhost"}:${process.env.PORT || 8080}`,
  );
});
