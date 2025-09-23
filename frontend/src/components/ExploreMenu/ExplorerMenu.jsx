import React from 'react'
import './ExplorerMenu.css'
import {menu_list} from '../../assets/assets'

const ExplorerMenu = ({catagary,setCatagary}) => {


  return (
    <div className='expolre-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse men featurng a delectable array of dishes .Our mission is to satisfy your cravng and elevate your dining experience, ne delicious meal at a time.</p>
    <div className='explore-menu-list'>
      {menu_list.map((item,index)=>{
        return (
        <div onClick={()=>setCatagary(prev=>prev === item.menu_name ?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
            <img className={catagary===item.menu_name ? "active":""} src={item.menu_image}alt='' />
          <p>{item.menu_name}</p>
        </div>)
      })}
    </div>
    <hr />
   </div>
  )
}

export default ExplorerMenu
