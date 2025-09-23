import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {
  const { getaTotalCartAmmount } = useContext(StoreContext)
  const [paymentMethod, setPaymentMethod] = useState('online')
  const [orderType, setOrderType] = useState('delivery')

  const deliveryFee = orderType === 'delivery' && paymentMethod === 'online' ? 2 : 0
  const subtotal = getaTotalCartAmmount()
  const total = subtotal + deliveryFee

  return (
    <form className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Order Information</p>

        {/* Delivery or Dine-in selection */}
        <div className="payment-method">
          <p>Select Order Type:</p>
          <label>
            <input
              type="radio"
              name="orderType"
              value="delivery"
              checked={orderType === 'delivery'}
              onChange={(e) => setOrderType(e.target.value)}
            />
            Delivery
          </label>
          <label>
            <input
              type="radio"
              name="orderType"
              value="dinein"
              checked={orderType === 'dinein'}
              onChange={(e) => setOrderType(e.target.value)}
            />
            Dine-in
          </label>
        </div>

        {orderType === 'delivery' && (
          <>
            <div className="multi-fields">
              <input type="text" placeholder='First Name'/>
              <input type="text" placeholder='Last Name'/>
            </div>
            <input type="email" placeholder='Email Address'/>
            <input type="text" placeholder='Nearest Town'/>
            <div className="multi-fields">
              <input type="text" placeholder='Street'/>
              <input type="text" placeholder='Address'/>
            </div>
            <input type="text" placeholder='Phone Number'/>
          </>
        )}

        <div className="payment-method">
          <p>Select Payment Method:</p>
          <label>
            <input 
              type="radio" 
              name="payment" 
              value="online" 
              checked={paymentMethod === 'online'} 
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Pay Online
          </label>
          <label>
            <input 
              type="radio" 
              name="payment" 
              value="counter" 
              checked={paymentMethod === 'counter'} 
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Pay at Counter
          </label>
        </div>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-summary">
            {orderType === 'delivery' && (
              <div className="cart-total-details">
                <p>Delivery fee</p>
                <p>LKR {deliveryFee}0.00</p>
              </div>
            )}
            <hr />
            <div className="cart-total-details">
              <b>Total </b>
              <b>LKR {total}0.00</b>
            </div>
          </div>
          <button>Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
