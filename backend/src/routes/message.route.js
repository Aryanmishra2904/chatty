import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessages,
  deleteMessage,
} from "../controllers/message.controller.js";

import upload from "../lib/multer.js"; // ✅ added

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

// ✅ FIXED: multer added
router.post("/send/:id", protectRoute, upload.single("file"), sendMessages);

router.delete("/:id", protectRoute, deleteMessage);

export default router;