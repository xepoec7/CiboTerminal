import { useNavigation } from "@react-navigation/native";
import { Box, ChevronLeftIcon, Container, Heading, HStack, Pressable, Text, VStack } from "native-base";
import React from "react";

const DescriptionComponent = (props) => {

    const product = props.product;
    const navigate = useNavigation();

    return (
        <Box safeAreaTop bg="green.400">
            <HStack pl={2} pb={5} space={5}>
                <Pressable onPress={() => navigate.goBack()} justifyContent={"center"}>
                    <ChevronLeftIcon color="white" size={5} mt="0.5" />
                </Pressable>
                <VStack width="80%">
                    <Text color="white" bold>{product.name}</Text>
                    <Text fontSize={"sm"} color="white">{product.ingredient}</Text>
                </VStack>
                <Box justifyContent={"center"}>
                    <Text fontSize={18} bold color="yellow.300">{product.price} €</Text>
                </Box>
            </HStack>
        </Box>
    )
}

export default DescriptionComponent;