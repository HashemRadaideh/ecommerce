import { auth } from "./routes/auth";
import { categories } from "./routes/categories";
import { category } from "./routes/category";
import { product } from "./routes/product";
import { products } from "./routes/products";
import { users } from "./routes/users";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

dotenv.config();

const app: express.Application = express();

// define api as json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// static directory
export const root = "out";
app.use(express.static(root));

console.log(`Frontend domain: ${process.env.FRONTEND_DOMAIN}`);

// cors: cross origin resource sharing
app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN || "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  }),
);

// middleware
app.use(cookieParser());
app.use(morgan("tiny"));

// routes
app.use("/api/v1/", auth, users, category, categories, product, products);

app.listen(process.env.PORT || 8080, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} environment on ` +
      `http://${process.env.HOST || "localhost"}:${process.env.PORT || 8080}`,
  );
});
