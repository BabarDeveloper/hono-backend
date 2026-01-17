import type { Context } from "hono";

let users: any[] = [];

export const createUser = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { name, email } = body;

    if (!name || !email) {
      return c.json({ error: "Name and Email are required" }, 400);
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
    };

    users.push(newUser);

    return c.json({ message: "User created successfully", data: newUser }, 201);
  } catch (error) {
    return c.json(
      {
        error: "Internal server error",
      },
      500
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
  const userId = Number(id);

  console.log("Looking for user ID:", userId);
  console.log("Available users:", users);

  if (!id || isNaN(userId)) {
    return c.json({ error: "Valid User ID is required" }, 400);
  }

  const user = users.find((u) => u.id === userId);

  if (!user) {
    console.log(
      "User not found. Available IDs:",
      users.map((u) => u.id)
    ); // Debug
    return c.json({ error: "User not found" }, 404);
  }

  return c.json({ total_user: users.length, fetch_user_by_id: user });
};
