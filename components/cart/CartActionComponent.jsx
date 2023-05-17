import { useNavigation } from "@react-navigation/native";
import { Box, Button, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import Api from "../../services/ApiService";

const CartActionComponent = () => {

    const navigation = useNavigation();

    return (
        <Box style={styles.bottomBox}>
            <Button onPress={() => navigation.navigate("ClientScreen")} colorScheme={"success"}>Ordinate</Button>
        </Box>
    )
}

const styles = StyleSheet.create({
    bottomBox: {
        position: "absolute",
        bottom: 0,
        width: "100%"
    }
});

export default CartActionComponent;