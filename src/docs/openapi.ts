import { Hono } from "hono";

const app = new Hono();

app.get("/spec", (c) => {
  const spec = {
    openapi: "3.1.0",
    info: {
      title: "User API",
      version: "1.0.0",
    },
    paths: {
      "/users": {
        get: {
          summary: "Get all users",
          responses: {
            200: {
              description: "A list of users",
            },
          },
        },
        post: {
          summary: "Create a new user",
          responses: {
            201: {
              description: "User created successfully",
            },
          },
        },
      },
      "/users/{id}": {
        get: {
          summary: "Get a user by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "User details",
            },
          },
        },
      },
    },
  };
  return c.json(spec);
});

export default app;