import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import * as process from "node:process";

const app = new Hono();

app.get("/api/hello", async (c) => {
  return c.text("Hello Hono!");
});

// Serve static files from the frontend build
app.use("*", serveStatic({ root: "../dist" }));

// Start the server on the correct port
serve({
  fetch: app.fetch,
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
});
