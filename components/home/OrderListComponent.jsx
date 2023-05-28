import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Box, HStack, Pressable, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Api from "../../services/ApiService";


const OrdersListComponent = () => {

    const API = new Api();
    const navigation = useNavigation();
    const [orders, setOrders] = useState([]);
    const [oldOrders, setOldOrders] = useState([]);

    // Initial collect of orders 
    useEffect(() => {
        API.getOrders()
            .then((res) => {
                let data = res.data;
                setOrders(data);
            });
    },[])


    useFocusEffect(
        React.useCallback(() => {
            API.getOrders()
            .then((res) => {
                let data = res.data;
                setOrders(data);
            });
        }, [])
    );

    

    useEffect(() => {
        const interval = setInterval(() => {
            API.getOrders()
                .then((res) => {
                    let data = res.data;
                    setOrders(data);
                })
        }, 20000);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        if (oldOrders !== orders) {
            setOldOrders(orders);

        }
    }, [orders])



    return (
            <HStack bg={"coolGray.100"} space={1} justifyContent="center">
                <Pressable rounded={8} onPress={() => navigation.navigate("OrderScreen")}>
                    <Box alignItems={"center"}
                        justifyContent="center"
                        bg={"green.100"}
                        style={styles.box}>
                            Nuovo ordine
                        </Box>
                </Pressable>
                {orders.map((item) => (
                    <Pressable key={item.id} onPress={() => navigation.navigate("OrderDetailsScreen", {"order": item}) }>
                        <Box alignItems={"center"}
                            justifyContent="center"
                            bg={"blue.100"}
                            style={styles.box}>
                                <Text>{item.client}</Text>
                                <Text>{item.orderNr}</Text>
                            </Box>
                    </Pressable>
                ))}
            </HStack>
    )
}

const styles = StyleSheet.create({
    box: {
        height: 100,
        width: 100,
    }
})

export default OrdersListComponent;