import express from "express";
import { createPayPalOrder, capturePayPalOrder, veruifyOrder, userOrder } from "../Controller/orderController.js";
import authMiddleware from '../Middleware/auth.js'
const router = express.Router();

router.post("/create-paypal-order", createPayPalOrder);
router.post("/capture-paypal-order", capturePayPalOrder);
router.post('/verify',veruifyOrder);
router.post('/userorders',authMiddleware,userOrder);

export default router;
