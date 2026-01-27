/**
 * Component: Navbar
 * Purpose: Global header for the Admin Dashboard.
 * Logic: Displays the brand logo and the admin profile icon.
 */

import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      {/* Brand Logo - Positioned on the left via CSS */}
      <img className='logo' src={assets.logo} alt="Company Logo" />

      {/* Admin Profile Image - Positioned on the right via CSS */}
      <img className='profile' src={assets.profile_image} alt="Admin Profile" />
    </div>
  )
}

// Ensure the export is at the bottom for clean architecture
export default Navbar