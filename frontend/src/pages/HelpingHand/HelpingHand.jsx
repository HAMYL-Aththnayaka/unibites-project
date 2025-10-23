import React, { useEffect, useState } from 'react';
import FoodItem from '../../components/FoodItem/FoodItem';
import api from '../../lib/axios';
import { useNavigate } from 'react-router-dom';
import './HelpingHand.css';

const HelpingHandDisplay = ({ category = 'All' }) => {
  const [helpingFoods, setHelpingFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch foods from Helping Hand endpoint
  const fetchHelpingFoods = async () => {
    try {
      const response = await api.get('/api/HelpingHand/foods/list');
      if (response.data.success) {
        setHelpingFoods(response.data.Data || []);
      } else {
        console.warn('Unexpected response format:', response.data);
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

  // Filter foods by category if not 'All'
  const filteredFoods = helpingFoods.filter(
    (item) =>
      category.toLowerCase() === 'all' ||
      item.category?.toLowerCase() === category.toLowerCase()
  );

  const renderAdminContact = () => (
    <div className={loading ? 'Question' : filteredFoods.length ? 'Question' : 'Question1'}>
      <p>{loading ? 'Loading charity foods...' : filteredFoods.length ? '' : 'No charity foods available right now.'}</p>
      <h3>Contact Admin For Support</h3>
      <button onClick={() => navigate('/contactadmin')}>Contact</button>
    </div>
  );

  if (loading || !filteredFoods.length) return renderAdminContact();

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
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpingHandDisplay;
