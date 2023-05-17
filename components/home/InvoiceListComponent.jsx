import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Pressable, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Api from "../../services/ApiService";

const InvoiceListComponent = () => {

    const API = new Api();
    const navigation = useNavigation();
    const [invoices, setInvoices] = useState([]);


    // Initial collect of invoice
    useEffect(() => {
        API.getInvoices()
            .then((res) => {
                let data = res.data;
                setInvoices(data);
            });
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            API.getInvoices()
                .then((res) => {
                    let data = res.data;
                    setInvoices(data);
                });
        }, 20000);
        return () => clearInterval(interval);
    }, [])


    return (
        <HStack bg={"coolGray.100"} space={1} justifyContent="center">
            {invoices.map((invoice) => (
                <Pressable key={invoice.id} onPress={() => navigation.navigate("InvoiceDetailsScreen", {"inv_id": invoice.id})}>
                    <Box alignItems={"center"}
                        justifyContent="center"
                        bg={"yellow.100"}
                        style={styles.box}>
                            <Text>{invoice.client}</Text>
                            <Text>{invoice.orderNr}</Text>
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

export default InvoiceListComponent;