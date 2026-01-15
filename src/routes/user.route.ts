import { Hono } from "hono";
import { createUser, getUserId, getUsers } from "../controllers/user.controller.js";

const router = new Hono();

router.post("/", createUser);

router.get("/", getUsers);

router.get("/:id", getUserId);

export default router;