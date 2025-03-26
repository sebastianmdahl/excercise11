import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pg from "pg";

const app = new Hono();

const postgresql = new pg.Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

app.get("/api/skoler", async (c) => {
  const result = await postgresql.query(`
    SELECT skolenavn, ST_AsGeoJSON(ST_Transform(posisjon, 4326)) AS geojson
    FROM grunnskoler_3697913259634315b061b324a3f2cf59.grunnskole
  `);

  return c.json({
    type: "FeatureCollection",
    features: result.rows.map((row) => ({
      type: "Feature",
      properties: { skolenavn: row.skolenavn },
      geometry: JSON.parse(row.geojson),
    })),
  });
});

const port = parseInt(process.env.PORT || "3000");
serve({ fetch: app.fetch, port });
