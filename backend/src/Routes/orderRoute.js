import express from "express";
import { createOrder, verifyOrder, userOrders,listOrders,updateStatus} from "../Controller/orderController.js";
import authMiddleware from '../Middleware/auth.js';

const router = express.Router();

router.post("/create-order", authMiddleware, createOrder);
router.post("/verify", authMiddleware, verifyOrder);
router.post("/userorders", authMiddleware, userOrders);
router.get("/list", listOrders);
router.post("/status", updateStatus);

export default router;
