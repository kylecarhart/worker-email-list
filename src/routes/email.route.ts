import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { emailInsertSchema } from "../models/email.model";
import { addEmail } from "../services/email.service";
import type { Bindings, ErrorResponse, Variables } from "../types";

const emailRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

emailRouter.post(
  "/",
  zValidator("json", emailInsertSchema, (result, c) => {
    if (!result.success) {
      return c.json<ErrorResponse>({ error: "Invalid email" }, 400);
    }
  }),
  async (c) => {
    const { email } = c.req.valid("json");

    try {
      await addEmail(email);
      c.status(200);
      return c.body(null);
    } catch (error: any) {
      if (error.message === "Email already exists") {
        console.log(`Email ${email} already exists`);
        c.status(200);
        return c.body(null);
      }
      console.log(error.message);
      return c.json<ErrorResponse>({ error: "Internal server error" }, 500);
    }
  }
);

export default emailRouter;
