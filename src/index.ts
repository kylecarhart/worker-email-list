import { Hono } from "hono";
import { contextStorage } from "hono/context-storage";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { dbMiddleware } from "./middleware/db.middleware";
import emailRouter from "./routes/email.route";
import type { ErrorResponse } from "./types";

const app = new Hono();
const v1 = new Hono();

// Apply middleware globally
app.use(contextStorage());
app.use(secureHeaders());
app.use(dbMiddleware());
app.use(cors()); // TODO: Restrict

// Health check
app.get("/", (c) => {
  return c.text("Healthy");
});

// V1 Routes
v1.route("/emails", emailRouter); // Email v1

// Bootstrap versioned routers
app.route("/api/v1", v1);

// Error handler
app.onError(async (error, c) => {
  console.error(error);
  return c.json<ErrorResponse>({ error: "Internal server error" }, 500);
});

export default app;
