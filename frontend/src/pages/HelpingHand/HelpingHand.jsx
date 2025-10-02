import React, { useEffect, useState } from 'react';
import FoodItem from '../../components/FoodItem/FoodItem';
import api from '../../lib/axios';

const HelpingHandDisplay = ({ catagory }) => {
  const [helpingFoods, setHelpingFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch foods from the Helping Hand endpoint
  const fetchHelpingFoods = async () => {
    try {
      const response = await api.get('/api/HelpingHand/foods/list');
      if (response.data.success) {
        setHelpingFoods(response.data.Data || []); // make sure it's an array
      }
    } catch (error) {
      console.error('Failed to fetch helping hand foods:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHelpingFoods();
  }, []);

  if (loading) {
    return <p>Loading charity foods...</p>;
  }

  if (!helpingFoods.length) {
    return <p>No charity foods available right now.</p>;
  }

  return (
    <div className='food-display' id='helping-hand-display'>
      <h2>Helping Hand - Foods Paid by Others</h2>
      <div className="food-display-list">
        {helpingFoods
          .filter(item => catagory === "All" || catagory === item.catagory)
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

export default HelpingHandDisplay;
