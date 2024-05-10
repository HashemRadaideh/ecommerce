import { loggingMiddleware, errorMiddleware } from "./middleware";
import home from "./routes";
import auth from "./routes/api/auth";
import api from "./routes/api/home";
import users from "./routes/api/users";
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
    origin: `http://${process.env.HOST}:3000`,
    methods: ["GET", "POST", "DELETE", "PUT"],
  }),
);

// middleware
app.use(loggingMiddleware, errorMiddleware);

// routes
app.use(api);
app.use(home);
app.use(auth);
app.use(users);

const server = http.createServer(app);

server.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} environment on ` +
      `http://${process.env.HOST}:${process.env.PORT}`,
  );
});
