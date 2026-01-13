<<<<<<< HEAD
import helpingHandModel from '../Models/helpingHandModel.js'; 
import orderModel from '../Models/orderModel.js';

export const createOrder = async (req, res) => {
  try {
    const { items, amount, totalAmount, address, paymentMethod, orderType } = req.body;
    const finalAmount = totalAmount !== undefined ? totalAmount : amount;
    const userId = req.body.userId || req.userId || (req.user && req.user._id);
    if (!userId) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    if (finalAmount === 0) {
      const newOrder = new orderModel({
        userId: userId, 
        items: items,
        amount: 0,     
        address: address,
        status: "Pending",
        payment: true   
      });
      await newOrder.save();
      return res.json({ success: true, message: "Free order placed" });
    }
    //  Regular Order logic
    const order = await orderModel.create({
      userId: userId,
      items: items,
      amount: finalAmount,
      address: address,
      paymentMethod: paymentMethod,
      orderType: orderType,
      payment: paymentMethod === 'online',
=======
import orderModel from '../Models/orderModel.js';

// Create Order 
export const createOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod, orderType } = req.body;

    const order = await orderModel.create({
      userId,
      items,
      amount,
      address,
      paymentMethod,
      orderType,
      payment: paymentMethod === 'online' ? true : false,
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
      status: 'Pending'
    });

    res.status(201).json({
      success: true,
<<<<<<< HEAD
      message: "Order placed successfully",
      orderId: order._id
    });
  } catch (err) {
    console.error("Create Order Error:", err);
=======
      message: paymentMethod === 'online' ? 'Order placed and paid successfully' : 'Order placed, pay at counter',
      orderId: order._id
    });
  } catch (err) {
    console.error(err);
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
    res.status(500).json({ success: false, error: err.message });
  }
};

// Verify Order 
export const verifyOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.json({ success: true, payment: order.payment, status: order.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get user orders
export const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, alert: err.message });
  }
};

// List all orders (admin)
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, alert: err.message });
  }
};

<<<<<<< HEAD
// status updating syrtem
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status, canteen } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ success: false, alert: "Order not found" });

    //add to hh db logic
    if (status && status.trim().toLowerCase() === "add to hh") {
      const orderCanteen = canteen || "Applied-Canteen";

      console.log("Adding items to HH");

      for (const item of order.items) {
        const exists = await helpingHandModel.findOne({ name: item.name, image: item.image });
        if (!exists) {
          await helpingHandModel.create({
            name: item.name,
            description: item.description || `Redistributed from order: ${order._id}`,
            price: 0,
            catagory: item.catagory || "General",
            canteen: orderCanteen,
            image: item.image
          });
        } else {
          console.log(`Item already exists in HH: ${item.name}`);
        }
      }
      await orderModel.findByIdAndDelete(orderId);
      console.log("Deleted order:", order._id);

      return res.status(200).json({
        success: true,
        alert: "Order moved to Helping Hand and deleted from active orders"
      });
    }
    // DELIVERED logic
    if (status === "Delivered") {
=======
// Update order status (delete)
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (status === "Delivered") {
      
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
      await orderModel.findByIdAndDelete(orderId);
      return res.status(200).json({ success: true, alert: "Order delivered and deleted" });
    }

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, alert: "Status updated" });
<<<<<<< HEAD

  } catch (err) {
    console.error("Error updating status:", err);
=======
  } catch (err) {
    console.error(err);
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
    res.status(500).json({ success: false, alert: err.message });
  }
};
