import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, removeFromCart ,getaTotalCartAmmount } = useContext(StoreContext)
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title"> 
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div className="">

              <div className='cart-items-title cart-items-item' key={item._id}>
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>LKR {item.price}0. 00</p>
                  <p>{cartItems[item._id]}</p>
                  <p>LKR {item.price*cartItems[item._id]}0 .00</p>
                  <p onClick={()=>{
                    removeFromCart(item._id)
                  }}className='cross'>x</p>  
              </div>
              <hr />
              </div>
            )
          }
          return null
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart  Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>LKR {getaTotalCartAmmount()}0. 00</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivary fee</p>
              <p>LKR {getaTotalCartAmmount()===0 ? 0 : 2}0 .00</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total </b>
              <b> LKR {getaTotalCartAmmount()===0?0:getaTotalCartAmmount()+2}0. 00</b>
            </div>  
          </div>
            <button onClick={()=>{
              navigate('/order')
            }}>Proceed to CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If You Have A PromoCode Enter it Here</p>
            <div className='cart-promocode-input'>
              <input type="text"placeholder='promocode...' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
