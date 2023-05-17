import { useNavigation } from "@react-navigation/native";
import { Box, ChevronLeftIcon, Heading, HStack, Pressable, ScrollView, Text, VStack } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

const TableScreen = (props) => {

    const navigate = useNavigation();
    const tables = props.route.params.clients;


    return (
        <Box>
            <HStack safeAreaTop pl="2" pb="5" bg="green.400">
                <Pressable onPress={() => navigate.goBack()}>
                    <ChevronLeftIcon color="white" size="5" mt="0.5" />
                </Pressable>
                <Text w="90%" textAlign="center" color="white" bold>Selezionare la tavolo</Text>
            </HStack>
            <ScrollView pl="5" pt="5">
                <Heading>Tavolo</Heading>
                <VStack flex={1}>
                    <HStack space={1} flexWrap="wrap">
                        {tables.map(tbl => (
                            <Pressable key={tbl.id} pt="2" onPress={() => navigate.navigate("OrderCompleteScreen", {client: tbl.id})}>
                                <Box
                                    style={styles.box}
                                    alignItems="center"
                                    justifyContent="center"
                                    bg="green.300"
                                >
                                    <Text>{tbl.name}</Text>
                                </Box>
                            </Pressable>
                        ))}
                    </HStack>
                </VStack>
            </ScrollView>
        </Box>
    )
}

const styles = StyleSheet.create({
    box: {
        height: 100,
        width: 100,
    }
})

export default TableScreen;