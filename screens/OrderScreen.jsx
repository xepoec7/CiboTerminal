import { useNavigation } from "@react-navigation/native";
import { Box, Heading, HStack, Icon, Image, Pressable, Text, ZStack } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { G, Path } from "react-native-svg";
import CategoriesComponent from '../components/order/CategoryComponent';
import OrderHeaderComponent from "../components/order/OrderHeaderComponent";
import ProductsComponent from '../components/order/ProductsComponent';
import CartContext from "../context/cart/CartContext";

const OrderScreen = (props) => {

    const navigate = useNavigation();
    const { cartItems } = useContext(CartContext);
    const [catId, setCatId] = useState(0);
    const [showProductComp, setShowProductComp] = useState(false);
    
    const categories = props.route.params.categories;
    const allProducts = props.route.params.products;
    const [products, setProducts] = useState([]);
    

    useEffect(() => {
        if (catId !== 0) {
            let selectedProducts = allProducts.filter((product) => product.category.id === catId);
            setProducts(selectedProducts);
            setShowProductComp(true);
        }
    }, [catId])

    return (
        <Box>
            <OrderHeaderComponent />
            {showProductComp? (
                <ProductsComponent catId={catId} products={products} showProducts={setShowProductComp} />
            ) : (
                <CategoriesComponent setCat={setCatId} categories={categories} />
            )}
        </Box>
    )
}

export default OrderScreen;