import AsyncStorage from "@react-native-async-storage/async-storage";
import { useReducer } from "react";
import CartReducer from './CartReducer';
import CartContext from './CartContext';
import { sumItems } from "./CartReducer";


// Local Storage
const storage = AsyncStorage.getItem("@cartItems")
? JSON.parse(JSON.stringify(AsyncStorage.getItem("@cartItems")))
: [];

// const local_client 
const local_client = AsyncStorage.getItem("client")
? JSON.parse(JSON.stringify(AsyncStorage.getItem("client")))
: 'restaurant';

const CartState = ({ children }) => {

    // Initial State of the cart 
    const initialState = {
        cartItems: storage,
        ...sumItems(storage),
        checkout: false,
        client: local_client,
    };


    // Set up the reducer
    const [state, dispatch] = useReducer(CartReducer, initialState);


    // Function to handle when an item is added from the store into the Cart
    const addToCart = (payload, qty=1) => {
        dispatch({type: "ADD_TO_CART", payload, qty});
    };


    // Function to handle when an item that is in the cart is added again
    const increase = (payload) => {
        dispatch({type: "INCREASE", payload});
    };


    // Function to handle when an item is removed from the Cart
    const decrase = (payload) => {
        dispatch({ type: "DECREASE", payload });
    };


    // Function to remove an item from the cart
    const removeFromCart = (payload) => {
        dispatch({ type: "REMOVE_ITEM", payload });
    };


    // Function to clear the cart
    const clearCart = () => {
        dispatch({type: "CLEAR"});
    }


    // Function to handle checkout
    const handleCheckout = () => {
        dispatch({type: "CHECKOUT"});
    };


    // Function to change client
    const changeClient = (payload) => {
        dispatch({type: "CHANGE_CLIENT", payload});
    };



    return (
        // Add the functions that have been defined above in to Context provider
        <CartContext.Provider
            value={{
                showCart: state.showCart,
                cartItems: state.cartItems,
                addToCart,
                removeFromCart,
                increase,
                decrase,
                handleCheckout,
                clearCart,
                changeClient,
                ...state
            }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartState;