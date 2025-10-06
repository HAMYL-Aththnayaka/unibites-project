import express from "express";
import { createPayPalOrder, capturePayPalOrder } from "../Controller/orderController.js";

const router = express.Router();

router.post("/create-paypal-order", createPayPalOrder);
router.post("/capture-paypal-order", capturePayPalOrder);

export default router;
