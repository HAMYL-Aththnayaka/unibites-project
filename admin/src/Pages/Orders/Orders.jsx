/**
 * Component: Orders
 * Purpose: Manages customer orders and handles redistribution of items to the 
 * Helping Hand (HH) program if food is not delivered.
 */

import React, { useState, useEffect } from 'react';
import './Orders.css';
import { assets } from '../../assets/assets';
import api from '../../lib/axios.js';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  // Local state to track which canteen is selected for HH transfer for each specific order
  const [selectedCanteens, setSelectedCanteens] = useState({}); 

  /**
   * Fetches all orders and filters out completed or already moved ones.
   */
  const fetchAllOrders = async () => {
    try {
      const response = await api.get('/order/list');
      if (response.data.success) {
        // Only show orders that are still being processed
        const activeOrders = response.data.data.filter(
          order => order.status !== 'Delivered' && order.status !== 'Moved to HH'
        );
        setOrders(activeOrders);

        // Initialize the canteen selection dropdown for each order
        const defaultCanteens = {};
        activeOrders.forEach(order => {
          defaultCanteens[order._id] = "Applied-Canteen"; 
        });
        setSelectedCanteens(defaultCanteens);
      }
    } catch (err) {
      toast.error("Error fetching orders");
    }
  };

  /**
   * Complex Logic: processHHTransfer
   * 1. Iterates through all items in an order.
   * 2. Posts each item to the Helping Hand database as a new 'free' food item.
   * 3. Updates the original order status to archive it.
   */
  const processHHTransfer = async (order) => {
    try {
      const selectedCanteen = selectedCanteens[order._id] || "Applied-Canteen";

      // Create an array of API calls for every item in the order
      const promises = order.items.map(item => {
        const hhData = {
          name: item.name || "Donated Food",
          description: `Redistributed from order: ${order._id}`,
          price: 0, // Helping Hand items are always free
          catagory: item.catagory || "General",
          canteen: selectedCanteen, 
          image: item.image || item.img || "default.png"
        };
        return api.post('/HelpingHand/foods/add', hhData);
      });

      // Execute all item transfers simultaneously
      await Promise.all(promises);

      // Finalize by updating the order status in the backend
      const response = await api.post('/order/status', {
        orderId: order._id,
        status: 'Add to HH',
        canteen: selectedCanteen
      });

      if (response.data.success) {
        toast.success("Items added to HH and Order archived.");
        // Remove the processed order from the visible list
        setOrders(prev => prev.filter(o => o._id !== order._id));
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      console.error("Transfer failed:", errorMsg);
      toast.error(`Failed to add food to HH: ${errorMsg}`);
    }
  };

  /**
   * Handles status changes (Processing, Delivery, etc.)
   * Intercepts "Add to HH" to trigger the redistribution logic.
   */
  const statusHandler = async (event, order) => {
    const newStatus = event.target.value;

    if (newStatus === "Add to HH") {
      await processHHTransfer(order);
      return;
    }

    try {
      const response = await api.post('/order/status', {
        orderId: order._id,
        status: newStatus
      });

      if (response.data.success) {
        toast.success(response.data.alert);
        // If delivered, remove from active list; otherwise, refresh list data
        if (newStatus === 'Delivered') {
          setOrders(prev => prev.filter(o => o._id !== order._id));
        } else {
          await fetchAllOrders();
        }
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // Updates local state when a different canteen is picked for an order
  const canteenChangeHandler = (orderId, value) => {
    setSelectedCanteens(prev => ({ ...prev, [orderId]: value }));
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h2>Orders List</h2>
      <div className='order-list'>
        {orders.length === 0 ? (
          <p>No active orders</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="Parcel" />
              <div>
                {/* Displaying comma-separated items and quantities */}
                <p className='order-item-food'>
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.name} × {item.quantity}{i !== order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <p className='order-item-name'>{order.address.firstName} {order.address.lastName}</p>
                <p className='order-item-address'>{order.address.street}, {order.address.city}</p>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>LKR {order.amount}</p>
              
              {/* Dropdown to select destination canteen for HH redistribution */}
              <select 
                value={selectedCanteens[order._id] || "Applied-Canteen"}
                onChange={(e) => canteenChangeHandler(order._id, e.target.value)}
              >
                <option value="Applied-Canteen">Applied-Canteen</option>
                <option value="Bs-Canteen">Bs-Canteen</option>
                <option value="Ammachi-Canteen">Ammachi-Canteen</option>
                <option value="Boys-Hostel-Canteen">Boys-Hostel-Canteen</option>
              </select>

              {/* Standard Order Status Control */}
              <select onChange={(event) => statusHandler(event, order)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Add to HH">Add to HH</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;