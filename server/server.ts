import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();
app.get("/api/hello", async (c) => {
  return c.text("Hello World!");
});
app.use("*", serveStatic({ root: "../dist" }));
serve(app);
