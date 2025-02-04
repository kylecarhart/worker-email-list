import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import * as schema from "./schema";

export function initDb(c: Context) {
  return drizzle(c.env.DB, { schema });
}

/** D1 Database with models */
export type MyD1Database = ReturnType<typeof initDb>;
