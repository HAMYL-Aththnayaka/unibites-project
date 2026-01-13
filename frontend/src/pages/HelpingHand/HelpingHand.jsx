import React, { useContext } from 'react';
import FoodItem from '../../components/FoodItem/FoodItem';
import { StoreContext } from '../../context/StoreContext';
import './HelpingHand.css';
<<<<<<< HEAD


const HelpingHandDisplay = ({ category = 'All' }) => {
  const { helping_food_list =[] } = useContext(StoreContext);
  
=======
import { useNavigate } from 'react-router-dom';

const HelpingHandDisplay = ({ category = 'All' }) => {
  const { helping_food_list =[] } = useContext(StoreContext);
  const navigate = useNavigate();
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
  console.log(helping_food_list)
  const filteredFoods = helping_food_list.filter(
    (item) => category === "All" || item.category === category
  );
  return (
    <div>
      <div className="food-display1" id="helping-hand-display">
        <h2>Helping Hand - Foods Paid by Others</h2>
        <div className="food-display-list1">
          {filteredFoods.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
<<<<<<< HEAD
              canteen={item.canteen}
=======
              description={item.description}
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
              price={0} 
              image={item.image}
              isHelpingHand={true} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpingHandDisplay;
