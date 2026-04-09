import { serve } from "@hono/node-server";
import app from "./app";
import { config } from "@customer-support/config";

const port = Number(config.port);

serve({
  fetch: app.fetch,
  port,
});

console.log(`Server is running on http://localhost:${port}`);
