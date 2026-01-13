<<<<<<< HEAD
import express from 'express';
import { createOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../Controller/orderController.js";
import authMiddleware from "../Middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/create-order", authMiddleware, createOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;
=======
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
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
