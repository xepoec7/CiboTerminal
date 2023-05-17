import { useNavigation } from "@react-navigation/native";
import { Box, Button, ChevronLeftIcon, HStack, Input, Pressable, Text, VStack } from "native-base";
import React, { useState } from "react";
import Api from '../services/ApiService';
import Printer from "../services/PrintService";

const PosScreen = ({route}) => {

    const API = new Api();
    const PRINT = new Printer()
    const invoice = route.params.invoice;
    const navigation = useNavigation();
    const [cashIn, setCashIn] = useState(0.00);
    const [cashOut, setCashOut] = useState(0.00);
    const [hide, setHide] = useState(true);
    
    const cashInHandler = (val) => {
        setCashIn(val);
        let out = val - invoice.total;
        setCashOut(out);
        if (val >= invoice.total) setHide(false);
    }

    const payInvoice = () => {
        API.payInvoice(invoice.id)
            .then(() => {
                API.deleteOrder(invoice.order)
                    .then(() => {
                        navigation.navigate('HomeScreen');
                    })
            }
        );
    }

    return (
        <VStack>
            <Box safeAreaTop bg={"green.400"}>
                <HStack pl={2} pb={5}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon color="white" size={5} mt="0.5" />
                    </Pressable>
                    <Text textAlign="center" color="white" width="85%" bold>{invoice.total} €</Text>
                </HStack>
            </Box>
            <HStack space={5} alignSelf="center" pt="5">
                <Text>Cliente</Text>
                <Text bold>{invoice.client}</Text>
            </HStack>
            <HStack space={5} alignSelf="center" pt="2">
                <Text>Creato</Text>
                <Text bold>{invoice.created}</Text>
            </HStack>
            <HStack space={5} alignSelf="center" pt="2">
                <Text>Ordine numero</Text>
                <Text bold>{invoice.orderNr}</Text>
            </HStack>
            <HStack space={5} alignSelf="center" pt="2">
                <Text>Totale</Text>
                <Text bold>{invoice.total} €</Text>
            </HStack>
            <HStack space={3} alignSelf="center" pt="2" alignItems="center">
                <Text>Incassare</Text>
                <Input width="100" keyboardType="decimal-pad" value={String(cashIn)} onChangeText={(val) => cashInHandler(Number(val))} />
                <Text>€</Text>
            </HStack>
            <HStack space={5} alignSelf="center" pt="2">
                <Text>Ritorno</Text>
                <Text bold>{String(cashOut)} €</Text>
            </HStack>
            <HStack space={5} alignSelf="center" pt="10">
                {hide? <Text></Text>:<Button onPress={() => payInvoice()} colorScheme="success">Paga</Button>}
            </HStack>
        </VStack>
    )
}

export default PosScreen;