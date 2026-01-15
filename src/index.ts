import { serve } from "@hono/node-server";
import { Hono } from "hono";
import userRoutes from "./routes/user.route.js"
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();

app.use(prettyJSON( { force: true  } ));
app.use(logger());

app.route("/users", userRoutes)

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
