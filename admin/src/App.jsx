/**
 * Admin Frontend UI improvements by Wijewardhana D.D.I
 * Purpose: Main application entry point for the Admin Dashboard.
 * Features: Flexbox layout, Centralized Routing, and Global Notifications.
 */

import React from 'react'
import Sidebar from './Components/Sidebar/Sidebar'
import Navbar from './Components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'

// Page Component Imports
import Add from './Pages/Add/Add'
import ContactAdmin from './Pages/ContactAdmin/ContactAdmin'
import AddToHelpingHand from './Pages/AddToHelpingHand/AddToHelpingHand'
import List from './Pages/List/List'
import Orders from './Pages/Orders/Orders'
import ListHelpng from './Pages/ListHelpingHand/ListHelpng'
import ListHelpuser from './Pages/ListHelpuser/ListHelpuser'

// External Library for Popup Notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const App = () => {
  return (
    <div className='admin-app'>
      {/* ToastContainer allows toast.success() or toast.error() to be visible anywhere in the app */}
      <ToastContainer />
      
      {/* Global Header Navigation */}
      <Navbar />
      <hr />

      {/* Main Layout Wrapper: 
          Uses Flexbox (display: flex) to keep Sidebar fixed to the left 
          and Dynamic Content (Routes) to fill the right side.
      */}
      <div className="app-content" style={{ display: 'flex', gap: '20px', padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        
        {/* Navigation Sidebar: Remains static while routes change */}
        <Sidebar />

        {/* Routing Logic: 
            Determines which page component to render based on the URL path.
        */}
        <Routes>
          {/* Admin Action Routes */}
          <Route path='/add' element={<Add />} />
          <Route path='/contact' element={<ContactAdmin />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/list' element={<List />} />

          {/* Helping Hand Feature Routes */}
          <Route path='/helpUsers' element={<ListHelpuser />} />
          <Route path='/help' element={<AddToHelpingHand />} />
          <Route path='/listhelp' element={<ListHelpng />} />
        </Routes>
        
      </div>
    </div>
  )
}

export default App