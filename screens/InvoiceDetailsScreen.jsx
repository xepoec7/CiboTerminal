import { useNavigation } from "@react-navigation/native";
import { Badge, Box, Button, FlatList, Heading, HStack, Spacer, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Api from "../services/ApiService";

const InvoiceDetailsScreen = ({route}) => {

    const API = new Api();
    const navigate = useNavigation();
    inv_id = route.params.inv_id;
    const [invoice, setInvoice] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.getInvoice(inv_id)
            .then((res) => {
                let data = res.data;
                setInvoice(data);
                setLoading(false);
            });
    }, []);

    

    const renderItem = ({item}) => (
        <Box bg="white" key={item.id}>
            <Box pl="4" pr="5" py="2">
                <HStack alignItems="center" space={3}>
                    <VStack>
                        <Text bold color="coolGray.800">{item.product}</Text>
                    </VStack>
                    <Spacer />
                    <Text color="coolGray.800">X {item.qty}</Text>
                </HStack>
            </Box>
        </Box>
    );


    return (
        <Box style={styles.container}>
            {loading? <Text>Loading</Text>: <Box>
                <Box safeAreaTop bg="green.400" pb="2">
                    <Heading alignSelf="center" size="md" color="white">
                        {invoice.client}
                    </Heading>
                </Box>

                <Box>
                    <FlatList
                        data={invoice.items}
                        renderItem={renderItem}
                        keyExtractor={item => item.product.id}
                    />
                </Box>
            </Box>}
            <HStack width="100%" style={styles.btn}>
                <Button onPress={() => navigate.navigate("PosScreen", {"invoice": invoice})} colorScheme="success" width="100%">Pagare</Button>
            </HStack>
        </Box>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    btn: {
        position: 'absolute',
        bottom: 0,
        width: "100%"
    }
});


export default InvoiceDetailsScreen;