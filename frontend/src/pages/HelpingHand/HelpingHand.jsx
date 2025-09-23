import React, { useState } from 'react'
import './HelpingHand.css'
import Header from '../../components/Header/Header'
import ExplorerMenu from '../../components/ExploreMenu/ExplorerMenu.jsx'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx'
import AppDownlaod from '../../components/appDownload/AppDownload.jsx'
const HelpingHand = () => {
  const [ catagary , setCatagary] = useState("All");
  return (
    <div>   
        <Header />
         want to help some one in need ?
         <AppDownlaod /> 
     </div>
  )
}

export default HelpingHand
 