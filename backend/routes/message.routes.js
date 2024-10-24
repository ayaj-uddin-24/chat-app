import express from "express";
import { getMsg, sendMsg } from "../controllers/message.controller.js";
import protectRoute from "../middlewares/protect.routes.js";
const router = express.Router();

router.get("/:id", protectRoute, getMsg);
router.post("/send/:id", protectRoute, sendMsg);

export default router;
