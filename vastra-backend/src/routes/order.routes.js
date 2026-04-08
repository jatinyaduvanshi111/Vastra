import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createOrder,
  verifyPayment,
  getMyOrders
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.post("/verify", protect, verifyPayment);
router.get("/", protect, getMyOrders);

export default router;