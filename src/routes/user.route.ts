import { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";
import { createUser, getUserId, getUsers } from "../controllers/user.controller.js";

const router = new Hono();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 *   post:
 *     summary: Create a new user
 *     responses:
 *       201:
 *         description: User created successfully
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 */

router.get("/ui", swaggerUI({ url: "/doc" }));

router.post("/", createUser);

router.get("/", getUsers);

router.get("/:id", getUserId);

export default router;