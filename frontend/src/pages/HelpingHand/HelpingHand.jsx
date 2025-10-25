import React, { useContext } from 'react';
import FoodItem from '../../components/FoodItem/FoodItem';
import { StoreContext } from '../../context/StoreContext';
import './HelpingHand.css';
import { useNavigate } from 'react-router-dom';

const HelpingHandDisplay = ({ category = 'All' }) => {
  const { helping_food_list =[] } = useContext(StoreContext); // ✅ get Helping Hand foods from context
  const navigate = useNavigate();
  console.log(helping_food_list)

  // Filter foods by category
  const filteredFoods = helping_food_list.filter(
    (item) => category === "All" || item.category === category
  );

  const renderAdminContact = () => (
    <div className={filteredFoods.length ? 'Question' : 'Question1'}>
      <p>{filteredFoods.length ? '' : 'No charity foods available right now.'}</p>
      <h3>Contact Admin For Support</h3>
      <button onClick={() => navigate('/contactadmin')}>Contact</button>
    </div>
  );

  if (!filteredFoods.length) return renderAdminContact();

  return (
    <div>
      {renderAdminContact()}
      <div className="food-display1" id="helping-hand-display">
        <h2>Helping Hand - Foods Paid by Others</h2>
        <div className="food-display-list1">
          {filteredFoods.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={0} // Always free
              image={item.image}
              isHelpingHand={true} // mark as free
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpingHandDisplay;
