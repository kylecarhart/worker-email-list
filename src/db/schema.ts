import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const emailsTable = sqliteTable("emails", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text().notNull().unique(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
});
