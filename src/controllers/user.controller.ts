import type { Context } from "hono";
import { createUserSchema, userIdSchema } from "../validators/user.schema.js";

let users: any[] = [];

export const createUser = async (c: Context) => {

  try {
    const body = await c.req.json();

    const validatedUser = createUserSchema.safeParse(body);

    if (!validatedUser.success) {
      return c.json({ error: "Validation failed", details: validatedUser.error }, 400);
    }

    const newUser = {
      id: Date.now(),
      name: validatedUser.data.name,
      email: validatedUser.data.email,
    };

    users.push(newUser);

    return c.json({ message: "User created successfully", data: newUser }, 201);
  } catch (error) {
    return c.json(
      {
        error: "Internal server error",
      },
      500,
    );
  }
};

export const getUsers = async (c: Context) => {
  return c.json({
    users_count: users.length,
    data: users,
  });
};

export const getUserId = async (c: Context) => {
  const id = c.req.param("id");

  const validatedUserId = userIdSchema.safeParse({id});
  if (!validatedUserId.success) {
    return c.json({ error: "Valid User ID is required" }, 400);
  }

  const userId = Number(validatedUserId.data.id);

  const user = users.find((u) => u.id === userId);

  if (!user) {
    console.log(
      "User not found. Available IDs:",
      users.map((u) => u.id),
    ); // Debug
    return c.json({ error: "User not found" }, 404);
  }

  return c.json({ data: user });
};
