import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { rateLimitMiddleware } from "../middleware/rate-limit.middleware";
import { emailInsertSchema } from "../models/email.model";
import { addEmail, unsubscribeEmail } from "../services/email.service";
import type { Env, ErrorResponse } from "../types";

const emailRouter = new Hono<Env>();

/**
 * Add email to database
 */
emailRouter.post(
  "/",
  rateLimitMiddleware("add-email"),
  zValidator("json", emailInsertSchema, (result, c) => {
    if (!result.success) {
      return c.json<ErrorResponse>({ error: "Invalid email" }, 400);
    }
  }),
  async (c) => {
    const { email } = c.req.valid("json");

    try {
      await addEmail(email);
      c.status(204);
      return c.body(null);
    } catch (error: any) {
      if (error.message === "Email already exists") {
        console.log(`Email ${email} already exists`);
        c.status(204);
        return c.body(null);
      }
      throw error;
    }
  }
);

/**
 * Unsubscribe an email
 */
emailRouter.delete("/:id", rateLimitMiddleware("unsubscribe"), async (c) => {
  const { id } = c.req.param();
  await unsubscribeEmail(id);
  c.status(200);
  return c.body(null);
});

export default emailRouter;
