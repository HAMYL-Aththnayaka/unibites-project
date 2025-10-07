import React from 'react'
import './Myorders.css'
import { useState } from 'react'
import api from '../../lib/axios.js'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'



const Myorders = () => {

    const [data,setData] =useState([]);
    const {token} = useContext(StoreContext)

    const fetchOrder = async()=>{
        const response = await axios.post('api/order/userorder',{},
             {
                headers: { Authorization: `Bearer ${token}` }
            })
        setData(response.data.data);
    }

    useEffect(()=>{
        if(token){
            fetchOrder();
        }
    },[token])

  return (
    <div className='my-orders'>
        <h2>Myorders</h2>
         <div className="container">
            {data.map((order,index)=>{
                <div key={index} className='my-orders-order'>
                    <img src={assets.parcel_icon} alt="" />
                    <p>
                        {order.items.map((item,index)=>{
                            if(index === order.items.length-1){
                               
                            }else{
                                 return item.name+ ' X ' +item.quantity+' , '
                            }
                        })}
                    </p>
                    <p>
                        LKR{order.amount}.00
                    </p>
                    <p>Items :{order.items.length}</p>
                </div>
            })}
         </div>
    </div>
  )
}

export default Myorders
