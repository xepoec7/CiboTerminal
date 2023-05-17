import { useNavigation } from "@react-navigation/native";
import { Box, Heading, HStack, Pressable, ScrollView, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Api from "../../services/ApiService";

const ProductsComponent = (props) => {

    category_id = props.catId;
    const API = new Api();
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();



    return (
        <ScrollView  w={["0", "100%"]} h="80" pl={7}>
            <Heading pt={5} size={"md"}>Prodotti</Heading>
            <VStack  flex={1}>
                <HStack space={1} flexWrap="wrap">
                    <Pressable onPress={() => props.showProducts(false)} pt={1}>
                        <Box style={styles.box}
                            alignItems="center"
                            justifyContent="center"
                            bg={"danger.200"}
                        >
                            ritorno
                        </Box>
                    </Pressable>
                    {props.products.map(product => (
                        <Pressable pt={1} key={product.id} onPress={() => navigation.navigate("ProductDetailsScreen", {"product_id": product.id}) }>
                            <Box style={styles.box}
                                alignItems="center"
                                justifyContent="center"
                                bg={"yellow.200"}
                            >
                                <Text>{product.name}</Text>
                            </Box>
                        </Pressable>
                    ))}
                </HStack>
            </VStack>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    box: {
        height: 100,
        width: 100,
    }
});

export default ProductsComponent;