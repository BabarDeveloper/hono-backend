import type { Context } from "hono";
import { createUserSchema, userIdSchema } from "../validators/user.schema.js";
import { query } from "../db/db.js";

// let users: any[] = [];

export const createUser = async (c: Context) => {
  try {
    const body = await c.req.json();

    const validatedUser = createUserSchema.safeParse(body);

    if (!validatedUser.success) {
      return c.json(
        { error: "Validation failed", details: validatedUser.error },
        400,
      );
    }

    // const newUser = {
    //   id: Date.now(),
    //   name: validatedUser.data.name,
    //   email: validatedUser.data.email,
    // };

    // users.push(newUser);

    const result = await query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [validatedUser.data.name, validatedUser.data.email],
    );

    const newUser = result.rows[0];

    return c.json({ message: "User created successfully", data: newUser }, 201);
  } catch (error: any) {
    console.error("Database error:", error);
    return c.json(
      {
        error: "Internal server error",
        details: error.message,
      },
      500,
    );
  }
};

export const getUsers = async (c: Context) => {
  try {
    const result = await query("SELECT * FROM users ORDER BY created_at DESC");
  
    // return c.json({
    //   users_count: users.length,
    //   data: users,
    // });
  
    return c.json({
      users_count: result.rowCount,
      data: result.rows,
    });
  } catch (error: any) {
    console.error("Database error:", error);
    return c.json(
      {
        error: "Internal server error",
        details: error.message,
      },
      500,
    );
  }
};

export const getUserId = async (c: Context) => {
 try {
   const id = c.req.param("id");
 
   const validatedUserId = userIdSchema.safeParse({ id });
   if (!validatedUserId.success) {
     return c.json({ error: "Valid User ID is required" }, 400);
   }
 
   // const userId = Number(validatedUserId.data.id);
 
   // const user = users.find((u) => u.id === userId);
 
   const result = await query("SELECT * FROM users WHERE id = $1", [validatedUserId.data.id])
 
   if (result.rowCount === 0) {
     console.log(
       "User not found. Checking for ID:", validatedUserId.data.id,
     ); // Debug
     return c.json({ error: "User not found" }, 404);
   }
 
   return c.json({ data: result.rows[0] });
 } catch (error: any) {
   console.error("Database error:", error);
   return c.json(
     {
       error: "Internal server error",
       details: error.message,
     },
     500,
   );
 }
};
