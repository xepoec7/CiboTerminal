import { useNavigation } from "@react-navigation/native";
import { Box, Center, Heading, HStack, Pressable, ScrollView, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Api from "../../services/ApiService";
import wav from "./notify.wav";

const NewOrdersComponent = (props) => {

    const API = new Api();
    const navigation = useNavigation();
    const [newOrdersExist, setNewOrdersExist] = useState(false);
    const [orders, setOrders] = useState([]);
    var Sound = require('react-native-sound');
    Sound.setCategory('Playback');
    var notify = new Sound(wav, Sound.MAIN_BUNDLE, (err) => {
        if (err) console.log("Sound not loaded");
    });

    useEffect(() => {
        const interval = setInterval(() => {
            API.getOpenOrders()
                .then((result) => {
                    let data = result.data;
                    if (data.length > 0) {
                        if (JSON.stringify(data) !== JSON.stringify(orders)) {
                            setOrders(data);
                            setNewOrdersExist(true);
                            return notify.play();
                        }
                    }
                    setNewOrdersExist(false);
                })
        }, 20000);
        return () => clearInterval(interval);
    });

    return (
        <>
            {newOrdersExist?
                <ScrollView horizontal={true}>                
                    <Center>
                        <Heading color="green.500" size={"md"}>Ordini aperti</Heading>
                        <HStack bg={"coolGray.100"} space={1} justifyContent="center">
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
                    </Center>
                </ScrollView>
            
            :null
            }
        </>
    )
}

const styles = StyleSheet.create({
    box: {
        height: 100,
        width: 100,
    }
})

export default NewOrdersComponent;