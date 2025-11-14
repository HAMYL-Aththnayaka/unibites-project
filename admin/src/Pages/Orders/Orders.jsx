import React, { useState, useEffect } from 'react';
import './Orders.css';
import { assets } from '../../assets/assets';
import api from '../../lib/axios.js';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await api.get('/order/list');
      if (response.data.success) {
        // Only show orders that are not delivered
        const activeOrders = response.data.data.filter(order => order.status !== 'Delivered');
        setOrders(activeOrders);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (err) {
      toast.error(err.toString());
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await api.post('/order/status', {
        orderId,
        status: newStatus
      });

      if (response.data.success) {
        toast.success(response.data.alert);

        // Hide from view if delivered
        if (newStatus === 'Delivered') {
          setOrders(prev => prev.filter(order => order._id !== orderId));
        } else {
          await fetchAllOrders();
        }
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      toast.error(err.toString());
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
                <p className='order-item-name'>{order.address.firstName} </p>
                <p className='order-item-address'>{order.address.street}, {order.address.city}</p>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>LKR {order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
