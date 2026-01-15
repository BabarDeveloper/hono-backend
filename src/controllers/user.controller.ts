import type { Context } from "hono";

let users: any[] = [];

// export const createUser = async (c: Context) => {
//   try {
//     const body = await c.req.json();
//     const { name, email } = body;

//     if (!name || !email) {
//       return c.json({ error: "Name and Email are required" }, 400);
//     }

//     const newUser = {
//       id: Date.now(),
//       name,
//       email,
//     };

//     users.push(newUser);

//     return c.json({ message: "User created successfully", data: newUser }, 201);
//   } catch (error) {
//     return c.json(
//       {
//         error: "Internal server error",
//       },
//       500
//     );
//   }
// };

export const createUser = async (c: Context) => {
    try {
        const body = await c.req.json();
        const { name, email} = body;

        if (!name || !email) {
            return c.json({ error: "Name and Email are required"}, 400);
        }

        const
    } catch (error) {
        
    }
}

export const getUsers = async (c: Context) => {
  return c.json({
    users_count: users.length,
    data: users,
  });
};
