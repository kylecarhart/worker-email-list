import { createMiddleware } from "hono/factory";
import { ErrorResponse } from "../types";

/**
 * Rate limit middleware
 * @param operationId - The operation ID to rate limit
 * @returns - The rate limit middleware
 */
export const rateLimitMiddleware = (operationId: string) =>
  createMiddleware(async (c, next) => {
    const ip = c.req.header("cf-connecting-ip") || "";
    const key = `${operationId}:${ip}`;

    const { success } = await c.env.RATE_LIMITER.limit({ key });
    if (!success) {
      return c.json<ErrorResponse>({ error: "Too many requests" }, 429);
    }
    await next();
  });
