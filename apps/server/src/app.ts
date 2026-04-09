import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { chatController, agentController } from "./controllers/chatController";

const app = new Hono();

// Middleware
app.use("*", cors());
app.use("*", logger());

// Routes
app.get("/api/health", (c) => c.json({ status: "ok" }));

app.route("/api/chat", chatController);
app.route("/api", agentController);

// Error handling
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal Server Error" }, 500);
});

export default app;
export type AppType = typeof app;
