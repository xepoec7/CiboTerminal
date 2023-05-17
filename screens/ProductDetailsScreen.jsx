import { Box, Center, Heading, HStack, Spinner, Text } from "native-base";
import React, { useEffect, useState } from "react";
import Api from "../services/ApiService";
import DescriptionComponent from "../components/product/DescriptionComponent";
import ActionComponent from "../components/product/ActionComponent";

const ProductDetailScreen = (props,{route}) => {

    const API = new Api();
    const product_id = props.route.params.product_id;
    const [product, setProduct] = useState();
    const topings = props.route.params.topings;
    console.log(topings);


    useEffect(() => {
        API.getProduct(product_id)
            .then((res) => {
                let data = res.data;
                setProduct(data);
            });
    }, [])

    return (
        <Box>
            {product? (
                <Box>
                    <DescriptionComponent product={product} />
                    <ActionComponent topings={topings} product={product} />
                </Box>
            ):
                <HStack space={2} justifyContent="center">
                    <Spinner accessibilityLabel="Loading posts">
                        <Heading size={"md"}>Loading</Heading>
                    </Spinner>
                </HStack>
            }
        </Box>
    )
}

export default ProductDetailScreen;