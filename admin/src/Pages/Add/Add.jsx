import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'


const Add = () => {
  return (
    <div>
      <div className="add">
        <form className='form'>
          <div className="add-img-upload flex-col">
              <p>
                Uplaod Image
              </p>
              <label htmlFor="image">
                <img src={assets.upload_area} alt="" />
              </label>
              <input type="file" id='image' hidden required />
            </div>  
              <div className="add-product-name flex-col">
                <p>
                  product name
                </p>
                <input type="text" name='name' placeholder='Type Here...'/>
              </div>
                <div className="add-product-description flex-col" >
                  <p>Product Description</p>
                  <textarea name="description" rows='6' placeholder='Write Content Here ..' required /> 
                </div>
                  <div className="add-catagory-price">
                    <div className="add-catagory flex-col">
                      <p>product catagory</p>
                      <select name="catagory">
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Desert">Desert</option>
                        <option value="Sandwich">Desert</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure-Veg">Pure-Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Drinks">Drinks</option>
                      </select>
                    </div>
                    <div className="add-price flex-col">
                      <p>Product price</p>
                      <input type=" number" name='price' placeholder='LKR 100.00'/>
                    </div>
                  </div>
                  <div className="Canteen-select">
                    <p>Please Select Which Canteen</p>
                    <select name="Canteen" >
                      <option value="Applied-Canteen">Applied-Canteen</option>
                      <option value="Bs-Canteen">Bs-Canteen</option>
                      <option value="Ammachi-Canteen">Ammachi-Canteen</option>
                      <option value="Boys-Hostal-Canteen">Boys-Hostal-Canteen</option>
                    </select>
                  </div>
                  <button type='submit' className='add-btn'>ADD</button>
        </form>
      </div>
    </div>
  )
}

export default Add
