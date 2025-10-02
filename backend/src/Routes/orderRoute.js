import express from 'express'
import authMiddleware from '../'
import { placeOrder } from "../Controller/orderController";

const orderROuter = express.Router();
orderROuter.post('/place',authMiddleware,placeOrder);

export default orderROuter;