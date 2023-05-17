import { useNavigation } from "@react-navigation/native";
import { Box, ChevronLeftIcon, HStack, Icon, Pressable, Text } from "native-base";
import React, { useContext } from "react";
import { G, Path } from "react-native-svg";
import CartContext from "../../context/cart/CartContext";

const OrderHeaderComponent = () => {

    const {cartItems} = useContext(CartContext);
    const navigate = useNavigation();

    return (
        <Box safeAreaTop bg={"green.400"}>
            <HStack pl={2} pb={5} pt={2} space="5">
                <Pressable onPress={() => navigate.goBack()}>
                    <ChevronLeftIcon color="white" size={5} mt="0.5" />
                </Pressable>
                <Text width="85%" bold color="white">Nuovo ordine</Text>
                {cartItems.length > 0 ? (
                    <Pressable onPress={() => navigate.navigate("CartScreen")}>
                        <Icon size={"xl"} viewBox="0 0 24 24" marginRight={10}>
                            <G fillRule="nonzero" stroke="none" strokeWidth={1} fill={"yellow.400"}>
                                <Path d="M10 19.5c0 
                                .829-.672 1.5-1.5 
                                1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 
                                1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 
                                0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 
                                1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 
                                7h11.898zm4.969-10l-3.432 12h-12.597l.839 
                                2h13.239l3.474-12h1.929l.743-2h-4.195z"/>
                            </G>
                        </Icon>
                    </Pressable>
                ):(
                    <Icon size={"xl"} viewBox="0 0 24 24" marginRight={10}>
                        <G fillRule="nonzero" stroke="none" strokeWidth={1} fill={"white"}>
                            <Path d="M10 19.5c0 
                            .829-.672 1.5-1.5 
                            1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 
                            1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 
                            0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 
                            1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 
                            7h11.898zm4.969-10l-3.432 12h-12.597l.839 
                            2h13.239l3.474-12h1.929l.743-2h-4.195z"/>
                        </G>
                    </Icon>
                )}
            </HStack>
        </Box>
    )
}

export default OrderHeaderComponent;