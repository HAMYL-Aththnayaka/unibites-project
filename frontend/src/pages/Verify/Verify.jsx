import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../../lib/axios.js'
import { StoreContext } from '../../context/StoreContext.jsx'

const Verify = () => {
    const [searchParam,setSearchParam] =useSearchParams();
    const success = searchParam.get('success')
    const orderId = searchParam.get('orderId')
    const {url}= useContext(StoreContext)
    const navigate = useNavigate();
    const verifyPayment = async ()=>{
        const response = await api.post('/api/order/verify',{success,orderId})
        
        if (response.data.success){
            navigate('/myorders')
        }else{
            navigate('/')
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])
    
  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify
