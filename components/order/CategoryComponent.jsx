import { Box, Heading, HStack, Pressable, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Api from "../../services/ApiService";

const CategoriesComponent = (props) => {

    const API = new Api();
    const categories = props.categories;


    return (
        <Box safeAreaTop pl={7}>
            <Heading size={"md"}>Categorie</Heading>
            <HStack space={1}>
                {categories.map(category => (
                    <Pressable onPress={() => props.setCat(category.id)} key={category.id}>
                        <Box style={styles.box}
                            alignItems="center"
                            justifyContent="center"
                            bg={"green.100"}
                        >
                            <Text>{category.name}</Text>
                        </Box>
                    </Pressable>
                ))}
            </HStack>
        </Box>
    )
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
    }
});

export default CategoriesComponent;