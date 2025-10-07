import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home/Home'
import Help from './pages/HelpingHand/HelpingHand'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LogginPopup from './components/LoginPopup/LogginPopup'
import Verify from './pages/Verify/Verify'
import Myorders from './pages/Myorders/Myorders'

const App = () => {

const [showLogin,setShowLogin] = useState(false)

  return (<>
  {showLogin?<LogginPopup setShowLogin={setShowLogin}/>:<></>}
  <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/cart'} element={<Cart/>}/>
        <Route path={'/order'} element={<PlaceOrder/>}/>
        <Route path={'/help'} element={<Help/>}/>
        <Route path={'/verify'} element={<Verify/>}/>
        <Route path={'/myorders'} element={<Myorders/>}/>
      </Routes>
    </div>
    <Footer />
  </>
    
  )
}

export default App
