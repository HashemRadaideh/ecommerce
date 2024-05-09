import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

import { addUser, getUser as getUserByEmail } from "@/api/models/users";

const auth = express.Router();

auth
  .route("/api/auth/register")
  .post(async (req: express.Request, res: express.Response) => {
    try {
      const { username, email, password } = req.body;
      console.log("username", username, "email", email, "password", password);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      if (await getUserByEmail(email)) {
        res.status(400).json({ error: "User already exists" });
        return;
      }

      try {
        addUser(username, email, hashedPassword);
      } catch (error) {
        console.error("Transaction failed:", error);
        res.status(500).json({ error: "Registration failed" });
      }

      const user = await getUserByEmail(email);

      const token = jwt.sign({ user_id: user?.user_id }, "secret", {
        expiresIn: "30d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(200).send({ token });
    } catch (error) {
      console.error("Registration failed:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

auth
  .route("/api/auth/login")
  .post(async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.body;

      const user = await getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign({ user_id: user?.user_id }, "secret", {
        expiresIn: "30d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.send(token);
    } catch (error) {
      console.error("Login failed:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

auth
  .route("/api/auth/logout")
  .post(async (req: express.Request, res: express.Response) => {});

export default auth;
