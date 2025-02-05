import { Hono } from "hono";
import { contextStorage } from "hono/context-storage";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { dbMiddleware } from "./middleware/db.middleware";
import emailRouter from "./routes/email.route";
import type { Bindings, ErrorResponse, Variables } from "./types";

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Apply middleware globally
app.use(contextStorage());
app.use(secureHeaders());
app.use(dbMiddleware());
app.use(cors()); // TODO: Restrict

// Health check
app.get("/", (c) => {
  return c.text("Healthy");
});

// Email routes
app.route("/emails", emailRouter);

// Error handler
app.onError(async (error, c) => {
  console.error(error);
  return c.json<ErrorResponse>({ error: "Internal server error" }, 500);
});

export default app;
