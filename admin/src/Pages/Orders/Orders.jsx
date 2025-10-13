import React ,{useState,useEffect} from 'react'
import './Orders.css'
import { assets } from '../../assets/assets'
import api from '../../lib/axios.js'
import {toast} from 'react-toastify'


const Orders = () => {
  const [orders , setOrders]= useState([]);

  const fetchAllOrders =async()=>{
    try{
      const response = await api.get('/order/list')
      if ( response.data.success){
        setOrders(response.data.data)
        console.log(response.data.data)
      }else{
        toast.error("Error ")
      }

    }catch(err){
        toast.error(err.toString())
    }
  }

  const  statusHandeler = async(event,orderId)=>{
      const response = await api.get('/order/status',{
        orderId,
        statu:event.target.status
      }) 
      if(response.data.success){
        await fetchAllOrders();
      }
  }
    useEffect(()=>{
        fetchAllOrders()
    },[])

  return (
  <div className="order add">
    <h2>Orders List</h2>
      <div className='order-list'> 
        {orders.map((order,index)=>(
          <div key={index}
          className='order-item'>
              <img src ={assets.parcel_icon} alt=""/>
            <div >
                <p className='order-item-food'>
                  {order.items.map((item,index)=>{
                    if(index  === order.items.lenght){
                      return item.name +' X ' + item.quantity
                    }else{
                      return item.name+' X ' +item.quantity+ ' , '
                    }
                    })}
                </p>
                <p className='order-item.name'>{order.address.firstName}</p>
                <div className="order-item-name">
                <p>{order.address.street +' , '}</p>
                <p>{order.address.City +' , '}</p>
                </div>
                <p className='order-item phone'>{order.address.phone}</p>
            </div>
            <p>
              Items:{order.items.length}
            </p>
            <p>LKR {order.ammount}</p>
            <select onChange={(event)=>statusHandeler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Deleiverd">Deleiverd</option>
            </select>
          </div>
        ))}
      </div>
  </div>
)}

export default Orders

