import React ,{useState} from 'react'
import './LogginPopup.css'
import { assets } from '../../assets/assets'

const LogginPopup = ({setShowLogin}) => {
    const [curentState,setCurrentState] =useState('Login')
  
    return (
    <div className='login-popup'>
      <form className='login-popup-container'>
        <div className="login-popup-title">
            <h2>{curentState}</h2>
            <img onClick={()=>{
              setShowLogin(false)
              }}src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {curentState === 'Login' ? <></>:<input type="text" placeholder='Your name' required/>}
          <br />
          <input type="text" placeholder='Your email' required/>
          <br />  
          <input type="password" placeholder='Password' required/>
        </div>
        <button>{curentState === 'Sign-up' ? 'Create a account':'Login'}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing , I agree to the terms of use & privacy policy</p>
        </div>
        {curentState==='Login'?<p>Create a New Account ?&nbsp; <span onClick={()=>{
          setCurrentState('Sign-up')}
        }> Click Here</span></p>:
          <p>Already Have a Account ? &nbsp; <span onClick={()=>{
            setCurrentState('Login')}
            }>  Login here</span></p>}
        
        
      </form>
    </div>
  )
}

export default LogginPopup
