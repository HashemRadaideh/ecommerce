import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";

dotenv.config();

const app: express.Application = express();

app.use(
  cors({
    origin: `http://${process.env.HOST}:3000`,
    methods: ["GET", "POST", "DELETE", "PUT"],
  }),
);

app.use("/api/home", (req, res) => {
  res.json({ message: "Hello, World!" });
});

const server = http.createServer(app);

server.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is running on http://${process.env.HOST}:${process.env.PORT}`,
  );
});
