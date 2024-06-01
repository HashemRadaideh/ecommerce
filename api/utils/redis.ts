import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.REDIS_URL || "redis://user:foobared@localhost:6379",
  token: process.env.REDIS_TOKEN,
});

export const CACHE_EXPIRATION = 60;
