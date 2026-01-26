/**
 * Add Component for "Helping Hand" Feature
 * Functionality: Handles product creation including image uploads, 
 * canteen selection, and dynamic form state.
 */

import React, { useEffect, useState } from 'react';
import './AddToHelpingHand.css';
import api from '../../lib/axios'
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';

const Add = () => { 
  
  // Local state for the uploaded image file (for preview and upload)
  const [image, setImage] = useState(null);

  // Object state for text and dropdown inputs
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    catagory: 'Salad',
    canteen: 'Applied-Canteen'
  });

  /**
   * Unified Change Handler
   * Handles both text inputs and file uploads in a single function.
   */
  const onChangeHandler = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // If a file is selected, store the file object
      setImage(files[0]);
    } else {
      // Otherwise, update the text fields dynamically using the [name] key
      setData(prev => ({ ...prev, [name]: value }));
    }
  };

  /**
   * Form Submission Handler
   * Uses FormData to send multipart/form-data (required for image files).
   */
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    // Note: data.price=0 inside Number() is unusual logic, ensures value is 0 or numeric
    formData.append('price', Number(data.price)); 
    formData.append('catagory', data.catagory);
    formData.append('canteen', data.canteen);
    formData.append('image', image);

    // API POST request using custom axios instance
    const response = await api.post('/HelpingHand/foods/add', formData)

    if (response.data.success) {
      // Reset form fields upon successful addition
      setData({
        name: '',
        description: '',
        price: '',
        catagory: 'Salad',
        canteen: 'Applied-Canteen'
      })
      setImage(null) // Clear image preview

      // Custom styled success toast for project UI consistency
      toast.success("Food Added Successfully !!!", {
        style: {
          background: "black",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
        },
        progressStyle: {
          background: "lime",
        },
      });

    } else {
      toast.error("Something Went Wrong! Food Was Not Added.")
    }
  }

  return (
    <div className="add">
      <form className="form" onSubmit={onSubmitHandler} >

        {/* Image Upload Section: label + URL.createObjectURL creates a live preview */}
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload area"
            />
          </label>
          <input type="file" id="image" onChange={onChangeHandler} hidden required />
        </div>

        {/* Text Input Section */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Type Here..."
            required
          />
        </div>

        {/* Textarea for longer descriptions */}
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            rows="6"
            value={data.description}
            onChange={onChangeHandler}
            placeholder="Write Content Here .."
            required
          />
        </div>

        {/* Multi-column layout for Category and Price */}
        <div className="add-catagory-price">
          <div className="add-catagory flex-col">
            <p>Product Category</p>
            <select name="catagory" value={data.catagory} onChange={onChangeHandler}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Dessert">Dessert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure-Veg">Pure-Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="LKR 100.00"
              required
            />
          </div>
        </div>

        {/* Dropdown for Canteen Selection */}
        <div className="Canteen-select flex-col">
          <p>Please Select Which Canteen</p>
          <select name="canteen" value={data.canteen} onChange={onChangeHandler}>
            <option value="Applied-Canteen">Applied-Canteen</option>
            <option value="Bs-Canteen">Bs-Canteen</option>
            <option value="Ammachi-Canteen">Ammachi-Canteen</option>
            <option value="Boys-Hostel-Canteen">Boys-Hostel-Canteen</option>
          </select>
        </div>

        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;