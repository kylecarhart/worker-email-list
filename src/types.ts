import { MyD1Database } from "./db";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
}

/**
 * Wrangler bindings
 */
export type Bindings = {
  DB: D1Database;
  RATE_LIMITER: {
    limit: (options: { key: string }) => Promise<{ success: boolean }>;
  };
  ENVIRONMENT: "dev" | "prod";
};

/**
 * Hono context variables
 */
export type Variables = {
  db: MyD1Database;
};

/**
 * Hono environment
 */
export type Env = {
  Bindings: Bindings;
  Variables: Variables;
};

export type ErrorResponse = {
  error: string;
};
