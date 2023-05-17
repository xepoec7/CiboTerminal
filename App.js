import React, { useEffect, useState } from "react";
import {NativeBaseProvider,extendTheme} from "native-base";
import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import OrderScreen from "./screens/OrderScreen";
import ProductDetailScreen from "./screens/ProductDetailsScreen";
import CartState from "./context/cart/CartState";
import CartScreen from "./screens/CartScreen";
import OrderCompleteScreen from "./screens/OrderCompleteScreen";
import ClientScreen from "./screens/ClientScreen";
import TableScreen from "./screens/TableScreen";
import InvoiceDetailsScreen from "./screens/InvoiceDetailsScreen";
import PosScreen from "./screens/PosScreen";


import KeepAwake from 'react-native-keep-awake';
import Api from "./services/ApiService";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

const Stack = createNativeStackNavigator();

export default function App() {

  const API = new Api();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [topings, setTopings] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    API.getCategories()
      .then((result) => {
        let data = result.data;
        setCategories(data);
      });
    API.getProducts()
      .then((result) => {
        let data = result.data;
        setProducts(data);
      });
    API.getAdditions()
      .then((result) => {
        let data = result.data;
        setTopings(data);
      });
    API.getTables()
      .then((result) => {
        let data = result.data;
        setClients(data);
      });
  }, []);

  return (
    <NativeBaseProvider>
      <CartState>
        <KeepAwake />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} 
            initialParams={{'products': products, 'categories': categories}} />
            <Stack.Screen name="ProductDetailsScreen" component={ProductDetailScreen} 
              initialParams={{'topings': topings}}
            />
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="ClientScreen" component={ClientScreen} />
            <Stack.Screen name="TableScreen" component={TableScreen} 
              initialParams={{'clients': clients}}
            />
            <Stack.Screen name="OrderCompleteScreen" component={OrderCompleteScreen} />
            <Stack.Screen name="InvoiceDetailsScreen" component={InvoiceDetailsScreen} />
            <Stack.Screen name="PosScreen" component={PosScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartState>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row' // <--- Add this line
}
});