import { getContext } from "hono/context-storage";
import { createMiddleware } from "hono/factory";
import { initDb } from "../db";
import type { Bindings, Variables } from "../types";

// Set up context storage middleware
export const dbMiddleware = createMiddleware(async (c, next) => {
  c.set("db", initDb(c));
  await next();
});

// Helper to get DB from anywhere
export const getContextDB = () => {
  const context = getContext<{ Bindings: Bindings; Variables: Variables }>();
  return context.var.db;
};
