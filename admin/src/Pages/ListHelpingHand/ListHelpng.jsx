/**
 * Component: List (Helping Hand Edition)
 * Purpose: Provides an interface for admins to manage food items specifically 
 * donated/listed under the "Helping Hand" initiative.
 * * Logic: Fetches a master list, then filters by canteen on the client side.
 */

import React, { useEffect, useState } from 'react'
import './ListHelping.css'
import api from '../../lib/axios'
import { toast } from 'react-toastify'

const List = () => {   
  // Backend server URL for asset (image) fetching
  const url = "http://localhost:3000"
  
  // State to hold the Helping Hand food items
  const [list, setList] = useState([]);
  
  // State for filtering the view based on the selected canteen location
  const [selectedCanteen, setSelectedCanteen] = useState("Applied-Canteen");

  /**
   * Function: fetchList
   * Calls the HelpingHand-specific API endpoint to retrieve data.
   */
  const fetchList = async () => {
    try {
      const response = await api.get('/HelpingHand/foods/list')
      
      if (response.data.success) {
        // Safe access to the data array, defaulting to empty if null
        setList(response.data.Data || [])
        toast.success("Helping Hand Food Fetched Successfully")
      } else {
        toast.error("Error In Fetching Food")
      }
    } catch (error) {
      toast.error("Could not reach the server")
    }
  }

  // Trigger data fetch when the component first appears (mounts)
  useEffect(() => {
    fetchList();
  }, [])
  
  /**
   * Function: removeFood
   * Sends a DELETE request with the item ID to remove it from Helping Hand.
   */
  const removeFood = async (foodId) => {
    try {
      // Axios DELETE requests often require 'data' property for body content
      const response = await api.delete('/HelpingHand/foods/remove', { data: { id: foodId } });
      
      if (response.data.success) {
        // Update state locally: Filter out the removed item to keep UI in sync
        setList(prevList => prevList.filter(item => item._id !== foodId));
        toast.success("Item Removed!!");
      } else {
        toast.error("Failed to remove item");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error during deletion");
    }
  };

  return (
    <div className='list add flex-col'>
      {/* Canteen Selection Dropdown */}
      <div className="option">
        <p>Select Which Canteen</p>
        <select 
          name="canteen" 
          value={selectedCanteen} 
          onChange={(e) => setSelectedCanteen(e.target.value)}
        >
          <option value="Applied-Canteen">Applied-Canteen</option>
          <option value="Bs-Canteen">Bs-Canteen</option>
          <option value="Ammachi-Canteen">Ammachi-Canteen</option>
          <option value="Boys-Hostel-Canteen">Boys-Hostel-Canteen</option>
        </select>
      </div>

      <div className="list-table">
        {/* Table Header Section */}
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b> 
          <b>Action</b>
        </div> 

        {/* Data Pipeline:
            1. Filter: Only show items where the canteen matches the selection.
            2. Map: Convert each filtered item into a table row.
        */}
        {list
          .filter(item => item.canteen === selectedCanteen)
          .map((item, index) => (
            <div key={index} className="list-table-format">
              {/* Image constructed using the base server URL + filename */}
              <img src={`${url}/images/` + item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.catagory}</p>
              <p>LKR {item.price}</p>
              {/* Action trigger to remove item */}
              <p onClick={() => { removeFood(item._id) }} className='cursor'>X</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default List