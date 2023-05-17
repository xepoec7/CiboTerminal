import {
    REMOVE_ITEM,
    ADD_TO_CART,
    INCREASE,
    DECREASE,
    CHECKOUT,
    CLEAR,
    CHANGE_CLIENT
} from './CartTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = (cartItems) => {
    AsyncStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems.length > 0 ? cartItems : [])
    );
};

const SaveClient = (data) => {
    AsyncStorage.setItem(
        'client',
        JSON.stringify(data)
    );
};


// Export function to calculate the total price of the cart and the total qty 
export const sumItems = (cartItems) => {
    Storage(cartItems);
    let itemCount = 0;
    let total = 0;
    if (cartItems.length > 0) {
        cartItems.map(item => {
            itemCount++;
            total = total + (item.product.price * item.qty);
        });
    }
    total = total.toFixed(2);
    return {itemCount, total};
}


// The reduce is listening for an action, which is the type that we defined in the Cart
const CartReducer = (state, action) => {

    // The switch statement is checking the type of action that is being passed in
    switch (action.type) {

        case ADD_TO_CART:
            state.cartItems = Array.isArray(state.cartItems)? state.cartItems:[];
            if (!state.cartItems.find((item) => item.product.id === action.payload.product.id)) {
                state.cartItems.push({
                    ...action.payload,
                    qty: action.qty,
                });
            } else {
                let item = state.cartItems.find((item) => item.product.id === action.payload.product.id);
                if (item) {
                    console.log(item.additions.length === action.payload.additions.length);
                    if (item.additions.length === action.payload.additions.length && item.additions.every((element, index) => {
                        return element === action.payload.additions[index];
                    })) {
                        item.qty += action.qty;
                    } else {
                        state.cartItems.push({
                            ...action.payload,
                            qty: action.qty,
                        });
                    }
                }
            }

            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems],
            };


        case REMOVE_ITEM:
            return {
                ...state,
                ...sumItems(
                    state.cartItems.filter((item) => item.product.id !== action.payload.id)
                ),
                cartItems: [
                    ...state.cartItems.filter((item) => item.product.id !== action.payload.id),
                ],
            };



        case INCREASE:
            state.cartItems[
                state.cartItems.findIndex((item) => item.id === action.payload.id)
            ].qty++;
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems],
            };



        case DECREASE:
            state.cartItems[
                state.cartItems.findIndex((item) => item.id === action.payload.id)
            ].qty--;
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems],
            };



        case CHECKOUT:
            return {
                cartItems: [],
                checkout: true,
                ...sumItems([]),
            };



        case CLEAR:
            return {
                cartItems: [],
                ...sumItems([]),
            };



        case CHANGE_CLIENT:
            return {
                ...state,
                client: action.payload,
                ...SaveClient(action.payload),
            };


        default:
            return state;
    }
}

export default CartReducer;