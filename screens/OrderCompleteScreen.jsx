import { useNavigation } from "@react-navigation/native";
import { Box, Button, CheckIcon, CloseIcon, Heading, HStack, Text, VStack } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import Api from "../services/ApiService";
import CartContext from "../context/cart/CartContext";
import Printer from "../services/PrintService";

const OrderCompleteScreen = ({route}) => {

    const API = new Api();
    const PRINTER = new Printer();
    const navigation = useNavigation();
    const client = route.params.client;
    const {cartItems, clearCart} = useContext(CartContext);
    const [completed, setCompleted] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [order, setOrder] = useState();
    const [orderNr, setOrderNr] = useState();


    useEffect(() => {
        let data = {client: client, orderitems: cartItems};
        API.sendOrder(data)
            .then((res) => {
                let data = res.data;
                setOrder(data);
                setOrderNr(data.orderNr);
                setCompleted(true);
                API.acceptOrder(data.id)
                    .then(()=> {
                        PRINTER.printItems(data.orderNr, data.orderitems);
                    })
            })
            .catch((err) => {
                console.log(err);
                setErrorMsg("Failed to send order to server.");
                setCompleted(false);
            });
    }, []);


    const finishHandler = () => {
        clearCart();
        navigation.navigate("HomeScreen");
    }


    const printAgain = () => {
        PRINTER.printItems(orderNr, order.orderitems);
    }


    return (
        <VStack safeAreaTop bg={completed? "green.300":"red.300"} h="100%">
            {completed? (
                <Box>
                    <HStack justifyContent="center" pt="10" space="2">
                        <CheckIcon size={7} mt={0.5} color="emerald.500" />
                        <Text fontSize={20}>Ordine Completare</Text>
                    </HStack>
                    <VStack alignItems="center" pt={10} space={2}>
                        <Text>numero d'ordine:</Text>
                        <Heading>{order.orderNr}</Heading>
                    </VStack>
                    <VStack space={5} pt={10} alignItems="center">
                        <Button onPress={() => printAgain()} colorScheme={"warning"} w="250">stampa di nuovo</Button>
                        <Button onPress={() => finishHandler()} colorScheme={"success"} w="250">FINE</Button>
                    </VStack>
                </Box>
            ):(
                <Box>
                    <HStack justifyContent="center" pt="10" space="2">
                        <CloseIcon size={7} mt={0.5} color="red.500" />
                        <Text fontSize={20}>Riscontriamo un errore</Text>
                    </HStack>
                    <HStack flexWrap={"wrap"} justifyContent="center" pt={10}>
                        <Text>{errorMsg}</Text>
                    </HStack>
                    <Box space={5} pt={40} alignItems="center">
                        <Button colorScheme="danger" w="250">RIPROVA</Button>
                    </Box>
                </Box>
            )}
        </VStack>
    )
}

export default OrderCompleteScreen;