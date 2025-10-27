import { createContext, useEffect, useState } from "react";
import api from '../lib/axios'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');
    const [food_list, setFood_list] = useState([]);
    const [helping_food_list, setHelping_food_list] = useState([]);

    const addToCart = async (itemId, isHelpingHand = false) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if (token) {
            await api.post(
                '/api/cart/add',
                { itemId, isHelpingHand },// true false yawanaw
                { headers: { Authorization: `Bearer ${token}` } }
            );
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await api.post('api/cart/remove',
                { itemId },
                { headers: { Authorization: `Bearer ${token}` } }
            )
        }
    };

    const getaTotalCartAmmount = () => {
        let totalAmmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                // Look in normal foods first
                let itemInfo = food_list.find(product => product._id === item)
                    || helping_food_list.find(product => product._id === item);

                if (itemInfo) {
                    // For Helping Hand foods
                    const price = itemInfo.isHelpingHand ? 0 : itemInfo.price;
                    totalAmmount += price * cartItems[item];
                }
            }
        }
        return totalAmmount;
    };


    const fetchFoodList = async (userToken = '') => {
        try {
            const headers = userToken ? { Authorization: `Bearer ${userToken}` } : {};

            const [normalRes, helpingRes] = await Promise.all([
                api.get('/api/foods/list'),
                api.get('/api/HelpingHand/foods/listfront', { headers }),
            ]);

            setFood_list(normalRes.data?.Data || []);
            setHelping_food_list(helpingRes.data?.Data || []);
        } catch (error) {
            console.error("Error fetching foods:", error);
        }
    };


    const loadCartData = async (token) => {
        const response = await api.post('api/cart/get',
            {},
            { headers: { Authorization: `Bearer ${token}` } });
        setCartItems(response.data.cartData)

    }

    useEffect(() => {
        async function loadData() {
            const storedToken = localStorage.getItem('token');//token eka gannawa REGISTER weddi hadena 
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
                await fetchFoodList(storedToken); // call after  token is ready
            } else {
                await fetchFoodList(); 
            }
        }
        loadData();
    }, []);


    const contextValue = {
        food_list,
        helping_food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getaTotalCartAmmount,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
