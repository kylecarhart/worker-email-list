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

export type Bindings = {
  DB: D1Database;
};

export type Variables = {
  db: MyD1Database;
};

export type ErrorResponse = {
  error: string;
};
