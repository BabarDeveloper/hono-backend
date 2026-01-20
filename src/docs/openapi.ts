export const openapiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Sample API",
    version: "1.0.0",
    description: "This is a sample API documentation.",
  },
  paths: {
    "/users": {
      get: {
        summary: "Get all users",
        responses: {
          200: {
            description: "A list of users",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    users_count: {
                      type: "number",
                      description: "Total number of users",
                    },
                    data: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/User",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
          summary: "Create a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          responses: {
            201: {
              description: "User created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                      },
                      data: {
                        $ref: "#/components/schemas/User",
                      },
                    },
                  },
                },
              },
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
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "The unique identifier for the user",
          },
          name: {
            type: "string",
            description: "The name of the user",
          },
          email: {
            type: "string",
            description: "The email address of the user",
          },
        },
        required: ["id", "name", "email"],
      },
    },
  },
};
