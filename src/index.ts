import { Hono } from "hono";
import { contextStorage } from "hono/context-storage";
import { dbMiddleware } from "./middleware/db.middleware";
import emailRouter from "./routes/email.route";
import type { Bindings, Variables } from "./types";

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Apply middleware globally
app.use(contextStorage());
app.use(dbMiddleware);

app.route("/emails", emailRouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
