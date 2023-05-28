import { useNavigation } from "@react-navigation/native";
import { Box, ChevronLeftIcon, Heading, HStack, Pressable, ScrollView, Text, VStack } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

const ClientScreen = () => {

    const navigation = useNavigation();

    return (
        <Box>
            <HStack safeAreaTop pl="2" pb="5" bg="green.400">
                <Pressable onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon color="white" size="5" mt="0.5" />
                </Pressable>
                <Text w={"90%"} textAlign="center" color="white" bold>Selezionare il cliente</Text>
            </HStack>
            <ScrollView pl="5" pt="5">
                <Heading>Clienti</Heading>
                <VStack flex={1}>
                    <HStack space={1} flexWrap="wrap">
                        <Pressable onPress={() => navigation.navigate("OrderCompleteScreen", {client: 4})}>
                            <Box
                                style={styles.box}
                                alignItems="center"
                                justifyContent="center"
                                bg="yellow.300"
                            >
                                <Text>Take Away</Text>
                            </Box>
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate("TableScreen")}>
                            <Box
                                style={styles.box}
                                justifyContent="center"
                                alignItems="center"
                                bg="yellow.300"
                            >
                                <Text>Tavolo</Text>
                            </Box>
                        </Pressable>
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

export default ClientScreen;