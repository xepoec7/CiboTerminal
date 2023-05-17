import React, { useState } from "react";
import { Box, Center, HStack, Icon, NativeBaseProvider, Pressable, Text } from "native-base"

const FooterComponent = () => {

    const [selected, setSelected] = useState(1);

    return (
        <NativeBaseProvider>
            <Box flex={1} width="100%" alignSelf={"center"}>
                <HStack bg={"indigo.600"} alignItems="center" shadow={6}>
                    <Pressable cursor="pointer"  opacity={selected === 0? 1:0.5} py={3}>
                        <Center>
                            <Text color="white" fontSize="12">
                                Home
                            </Text>
                        </Center>
                    </Pressable>
                </HStack>
            </Box>
        </NativeBaseProvider>
    )
}

export default FooterComponent;