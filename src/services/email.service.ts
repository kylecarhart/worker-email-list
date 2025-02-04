import { emailsTable } from "../db/schema";
import { getContextDB } from "../middleware/db.middleware";

export const addEmail = async (email: string) => {
  const db = getContextDB();
  try {
    const result = await db.insert(emailsTable).values({ email }).returning();
    return result[0];
  } catch (error: any) {
    if (error.message?.includes("UNIQUE constraint failed")) {
      throw new Error("Email already exists");
    }
    throw error;
  }
};
