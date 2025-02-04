import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { emailsTable } from "../db/schema";

export const emailSelectSchema = createSelectSchema(emailsTable);
export const emailInsertSchema = createInsertSchema(emailsTable, {
  email: (schema) => schema.email(),
});
