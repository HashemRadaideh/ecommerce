import bcrypt from "bcrypt";
import express from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { authMiddleware } from "@/api/middleware";
import { addUser, getUserByEmail } from "@/api/models/users";

export const auth = express.Router();

auth.route("/auth").post(async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (await getUserByEmail(email)) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    try {
      await addUser(username, email, password);
    } catch (error) {
      console.error("Transaction failed:", error);
      res.status(500).json({ error: "Registration failed" });
      return;
    }

    const user = await getUserByEmail(email);

    const token = jwt.sign(
      { id: user?.id, role: user?.role },
      process.env.SECRET || "secret",
      {
        expiresIn: "30d",
      },
    );

    res.status(200).send({ token });
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

auth.route("/auth").put(async (req: Request, res: Response) => {
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

    const token = jwt.sign(
      { id: user?.id, role: user?.role },
      process.env.SECRET || "secret",
      {
        expiresIn: "30d",
      },
    );

    res.status(200).send({ token });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

auth
  .route("/auth")
  .delete(authMiddleware, async (_req: Request, res: Response) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "User unregistered successfully" });
    } catch (error) {
      console.error("Unregister failed:", error);
      res.status(500).json({ error: "Unregister failed" });
    }
  });
