import "dotenv/config";
import { defineConfig } from "drizzle-kit";

/**
 * db:push doesnt work atm, @see https://github.com/drizzle-team/drizzle-orm/issues/3728
 */
export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
});
