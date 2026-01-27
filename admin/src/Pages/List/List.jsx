/**
 * Component: List
 * Purpose: Displays a categorized list of food items based on the selected canteen.
 * Features: Dynamic filtering, remote deletion, and real-time UI synchronization.
 */

import React, { useEffect, useState } from 'react'
import './List.css'
import api from '../../lib/axios'
import { toast } from 'react-toastify'

const List = () => {
  // Base URL for fetching images stored on the backend server
  const url = "http://localhost:3000";
  
  // State for storing the full list of food items
  const [list, setList] = useState([]);
  
  // State for the canteen filter (defaulted to 'Applied-Canteen')
  const [selectedCanteen, setSelectedCanteen] = useState("Applied-Canteen");

  /**
   * Function: fetchList
   * Retrieves all food items from the database.
   */
  const fetchList = async () => {
    const response = await api.get('/foods/list')
    
    if (response.data.success) {
      // Extracting the 'Data' array from the response object
      setList(response.data.Data || [])
      toast.success("Food Data Fetched Successfully")
    } else {
      toast.error("Error In Fetching Food List")
    }
  }

  // Lifecycle: Fetch the master list once the component is mounted
  useEffect(() => {
    fetchList();
  }, [])

  /**
   * Function: removeFood
   * Deletes a specific food item using its unique ID.
   * Uses 'data' property in axios.delete to send the ID in the request body.
   */
  const removeFood = async (foodId) => {
    try {
      const response = await api.delete('/foods/remove', { data: { id: foodId } });
      
      if (response.data.success) {
        // UI Optimization: Instantly remove the item from the local state
        // This avoids making a second network request to refresh the list.
        setList(prevList => prevList.filter(item => item._id !== foodId));
        toast.success("Item Removed Successfully!!");
      } else {
        toast.error("Failed to remove item");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server communication error");
    }
  };

  return (
    <div className='list add flex-col'>
      {/* Canteen Filter Dropdown */}
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

      {/* Food Items Table */}
      <div className="list-table">
        {/* Table Header */}
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b> 
          <b>Action</b>
        </div> 

        {/* Data Rendering Logic:
            1. .filter() isolates items belonging to the selected canteen.
            2. .map() iterates through the filtered results to generate rows.
        */}
        {list
          .filter(item => item.canteen === selectedCanteen)
          .map((item, index) => (
            <div key={index} className="list-table-format">
              {/* Dynamic Image Loading from Backend Storage */}
              <img src={`${url}/images/` + item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.catagory}</p>
              <p>LKR {item.price}</p>
              {/* Delete Action Trigger */}
              <p onClick={() => { removeFood(item._id) }} className='cursor'>X</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default List