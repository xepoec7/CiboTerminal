import { useNavigation } from "@react-navigation/native";
import { Box, ChevronLeftIcon, HStack, Pressable, Text, VStack } from "native-base";
import React, { useContext } from "react";
import CartContext from "../../context/cart/CartContext";

const CartHeaderComponent = () => {
    const {total, itemCount} = useContext(CartContext);
    const navigation = useNavigation();

    return (
        <Box safeAreaTop bg={"green.400"}>
            <HStack pl={2} pb={5}>
                <Pressable onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon color="white" size={5} mt="0.5" />
                </Pressable>
                <Text width="85%" textAlign="center" color="white" bold>totale {total} €</Text>
                <Text width="20%" color="white">quantità x{itemCount}</Text>
            </HStack>
        </Box>
    )
}

export default CartHeaderComponent;