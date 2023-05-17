import React from "react";
import {Center, Heading, ScrollView } from "native-base"
import { StyleSheet } from "react-native";
import OrdersListComponent from "../components/home/OrderListComponent";
import InvoiceListComponent from "../components/home/InvoiceListComponent";
import Printer from "../services/PrintService";
import NewOrdersComponent from "../components/home/NewOrdersComponent";


const HomeScreen = () => {

    return (
        <Center  safeAreaLeft safeAreaRight height="100%" width="100%" flex={1}>
            <NewOrdersComponent />
            <ScrollView horizontal={true}>
                <Center>
                    <Heading size={"md"}>Ordini in corso</Heading>
                    <OrdersListComponent />
                </Center>
            </ScrollView>
            <ScrollView horizontal={true}>
                <Center>
                    <Heading size={"md"}>Fattura</Heading>
                    <InvoiceListComponent />
                </Center>
            </ScrollView>
        </Center>
    )
}

const styles = StyleSheet.create({
    box: {
        height: 100,
        width: 100,
    }
})

export default HomeScreen;