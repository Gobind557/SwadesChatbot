import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { serveStatic } from "@hono/node-server/serve-static";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chatController, agentController } from "./controllers/chatController";

const app = new Hono();
const currentDir = dirname(fileURLToPath(import.meta.url));
const webDistPath = resolve(currentDir, "../../../web/dist");
const indexFilePath = resolve(webDistPath, "index.html");
const webDistRelativePath = "apps/web/dist";
const hasWebBuild = existsSync(indexFilePath);

// Middleware
app.use("*", cors());
app.use("*", logger());

// Routes
app.get("/api/health", (c) => c.json({ status: "ok" }));

app.route("/api/chat", chatController);
app.route("/api", agentController);

if (hasWebBuild) {
  app.use(
    "*",
    serveStatic({
      root: webDistRelativePath,
    }),
  );

  app.get("*", async (c) => {
    const html = await readFile(indexFilePath, "utf8");
    return c.html(html);
  });
}

// Error handling
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal Server Error" }, 500);
});

export default app;
export type AppType = typeof app;
