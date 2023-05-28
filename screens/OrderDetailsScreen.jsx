import { useNavigation } from "@react-navigation/native";
import { Badge, Box, Button, FlatList, Heading, HStack, Spacer, Text, VStack } from "native-base";
import { background } from "native-base/lib/typescript/theme/styled-system";
import React from "react";
import { StyleSheet } from "react-native";
import Api from "../services/ApiService";
import Printer from "../services/PrintService";

const OrderScreen = ({route}) => {

    const PRINTER = new Printer();
    const API = new Api();
    const navigator = useNavigation();
    const order = route.params.order;
    const orderNr = String(order['orderNr'])


    const printClick = () => {
        PRINTER.printItems(orderNr, order.orderitems)
    }

    const acceptClick = () => {
        PRINTER.printItems(orderNr, order.orderitems);
        API.acceptOrder(order.id)
            .then(() => {
                navigator.navigate('HomeScreen');
            }
        );
    }

    const completeClick = () => {
        API.completeOrder(order.id)
            .then(() => {
                navigator.navigate('HomeScreen');
            });
    }


    const renderItem = ({item}) => (
        <Box bg="white" key={item.id}>
            <Box pl="4" pr="5" py="2" key={item.id}>
                <HStack alignItems="center" space={3}>
                    <VStack key={item.id}>
                        <Text bold color="coolGray.800">{item.product}</Text>
                        <Text color="coolGray.600">
                            {item.addition?.map(add => (
                                <Badge colorScheme={add.addTo? 'success':'danger'}>
                                    {add.addition}
                                </Badge>
                            ))}
                        </Text>
                    </VStack>
                    <Spacer />
                    <Text color="coolGray.800">X {item.qty}</Text>
                </HStack>
            </Box>
        </Box>
    );


    return (
        <Box  style={styles.container}>
            <Box safeAreaTop bg="green.400" pb="2">
                <Heading  alignSelf={"center"} size={"md"} color="white">
                    {order.client}, ordina su: {order.created}
                </Heading>
            </Box>

       
            <Box>
                <FlatList 
                    data={order.orderitems}
                    renderItem={renderItem}
                    keyExtractor={item => item.product.id}
                />
            </Box>
            {order.status === 'O'? 
                <Button style={styles.btn} onPress={() => acceptClick()} colorScheme="success">Accettare</Button>
            :
                <HStack space="1" style={styles.btnsContainer} >
                    <Button onPress={() => printClick()} style={styles.btn_in_container}>Stampa di nuovo</Button>
                    <Button onPress={() => completeClick()} style={styles.btn_in_container} colorScheme="success">Ordine Completo</Button>
                </HStack>
            }
        </Box>
        
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    btnsContainer: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
    },
    btn_in_container: {
        flex: 1,
    },
    btn: {
        position: 'absolute',
        bottom: 0,
        width: "100%"
    }
});

export default OrderScreen;