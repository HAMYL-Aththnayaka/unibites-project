import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ catagory }) => {
  const { food_list = [] } = useContext(StoreContext); // default to []

  if (!food_list || food_list.length === 0) {
    return <p>Loading food items...</p>; 
  }

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You ..</h2>
      <div className="food-display-list">
        {food_list
          .filter(item => catagory === "All" || catagory === item.category)
          .map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
