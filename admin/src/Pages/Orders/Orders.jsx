import React, { useState, useEffect } from 'react';
import './Orders.css';
import { assets } from '../../assets/assets';
import api from '../../lib/axios.js';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await api.get('/order/list');
      if (response.data.success) {
        const activeOrders = response.data.data.filter(order => order.status !== 'Delivered' && order.status !== 'Moved to HH');
        setOrders(activeOrders);
      }
    } catch (err) {
      toast.error("Error fetching orders",err);
    }
  };
const processHHTransfer = async (order) => {
  try {
    console.log("Starting transfer for order items:", order.items);
    const promises = order.items.map(item => {
      const hhData = {
        name: item.name || "Donated Food",
        description: `Redistributed from order: ${order._id}`,
        price: 0,
        catagory: item.catagory || "General",
        canteen: "Main Canteen",
        image: item.image || item.img || "default.png" 
      };

      console.log("Sending to HH Database:", hhData);
      return api.post('/HelpingHand/foods/add', hhData);
    });

    
    const results = await Promise.all(promises);
    console.log("Helping Hand API Results:", results);

    const response = await api.post('/order/status', {
      orderId: order._id,
      status: 'Moved to HH' 
    });

    if (response.data.success) {
      toast.success("Items added to HH and Order archived.");
      setOrders(prev => prev.filter(o => o._id !== order._id));
    }

  } catch (err) {

    const errorMsg = err.response?.data?.message || err.message;
    console.error("Transfer failed. Order was NOT deleted. Error:", errorMsg);
    toast.error(`Failed to add food to HH: ${errorMsg}`);
  }
};

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
        if (newStatus === 'Delivered') {
          setOrders(prev => prev.filter(o => o._id !== order._id));
        } else {
          await fetchAllOrders();
        }
      }
    } catch (err) {
      toast.error("Failed to update status",err);
    }
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
              
              <select onChange={(event) => statusHandler(event, order)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Add to HH">Add to HH </option>// used to send to helping hand and delete
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
