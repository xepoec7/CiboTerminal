import { Box, Text, VStack } from "native-base";
import React from "react";
import CartActionComponent from "../components/cart/CartActionComponent";
import CartHeaderComponent from "../components/cart/CartHeaderComponent";
import ItemsListComponent from "../components/cart/ItemListComponent";

const CartScreen = () => {

    return (
        <VStack height="100%">
            <CartHeaderComponent />
            <ItemsListComponent />
            <CartActionComponent />
        </VStack>
    )
}

export default CartScreen;