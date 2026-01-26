/**
 * Component: Add
 * Purpose: Handles the submission of new food items to the database.
 * Key Features: Image preview, dynamic form state, and multipart/form-data submission.
 */

import React, { useEffect, useState } from 'react';
import './Add.css';
import api from '../../lib/axios'
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';

const Add = () => { 
  
  // State for the image file selected via the file input
  const [image, setImage] = useState(null);

  // Unified state object for all text-based and dropdown form inputs
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    catagory: '',
    canteen: 'Applied-Canteen'
  });

  /**
   * Handler: onChangeHandler
   * Updates state based on input changes. Distinguishes between 
   * file inputs (for images) and standard text/select inputs.
   */
  const onChangeHandler = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // Store the actual file object for the image
      setImage(files[0]);
    } else {
      // Dynamically update the data object based on the input's 'name' attribute
      setData(prev => ({ ...prev, [name]: value }));
    }
  };

  /**
   * Handler: onSubmitHandler
   * Packages form state into FormData and sends it to the server.
   */
  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevents page reload on form submission

    // FormData is required to send files (images) alongside text data
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price)); // Ensures price is sent as a number
    formData.append('catagory', data.catagory);
    formData.append('canteen', data.canteen);
    formData.append('image', image);

    try {
      const response = await api.post('/foods/add', formData);

      if (response.data.success) {
        // Reset the form state upon a successful database entry
        setData({
          name: '',
          description: '',
          price: '',
          catagory: '',
          canteen: 'Applied-Canteen'
        });
        setImage(false); // Clear the image preview

        // Success notification with customized styling
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
        toast.error("Something Went Wrong! Food Was Not Added.");
      }
    } catch (error) {
      toast.error("Network Error: Could not connect to the server.");
    }
  };

  return (
    <div className="add">
      <form className="form" onSubmit={onSubmitHandler} >

        {/* Image Upload: label is linked to a hidden input for a better UI experience */}
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            {/* URL.createObjectURL creates a temporary local path to preview the selected image */}
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload area"
            />
          </label>
          <input type="file" id="image" onChange={onChangeHandler} hidden required />
        </div>

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

        {/* Category and Price grouped for horizontal layout via CSS */}
        <div className="add-catagory-price">
          <div className="add-catagory flex-col">
            <p>Product Category</p>
            <select name="catagory" value={data.catagory} onChange={onChangeHandler} required>
              <option value="" disabled>Select Category</option>
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