import { eq } from "drizzle-orm";
import { emailsTable } from "../db/schema";
import { db } from "../middleware/db.middleware";

/**
 * Add an email to the database
 * @param email - The email to add
 * @returns The email that was added
 */
export async function addEmail(email: string) {
  try {
    const result = await db().insert(emailsTable).values({ email }).returning();
    return result[0];
  } catch (error: any) {
    if (error.message?.includes("UNIQUE constraint failed")) {
      throw new Error("Email already exists");
    }
    throw error;
  }
}

/**
 * Unsubscribe an email from the database
 * @param id - The id of the email to unsubscribe
 */
export async function unsubscribeEmail(id: string) {
  await db().delete(emailsTable).where(eq(emailsTable.id, id));
}
