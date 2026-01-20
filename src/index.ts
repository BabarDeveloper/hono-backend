import { serve } from "@hono/node-server";
import { Hono } from "hono";
import userRoutes from "./routes/user.route.js"
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { swaggerUI } from "@hono/swagger-ui";
import { openapiSpec } from "./docs/openapi.js";

const app = new Hono();

app.use(prettyJSON( { force: true  } ));
app.use(logger());

app.route("/users", userRoutes)

app.get("/spec", (c) => {
  const spec = openapiSpec
  return c.json(spec);
});

app.get("/doc", swaggerUI({ url: "/spec" }));

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
