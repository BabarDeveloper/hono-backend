import { Hono } from "hono";
import { createUser, getUsers } from "../controllers/user.controller.js";

const router = new Hono();

router.post("/", createUser);

router.get("/", getUsers);

export default router;