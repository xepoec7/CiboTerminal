import { Badge, Box, DeleteIcon, HStack, Pressable, Spacer, Text, VStack } from "native-base";
import React, { useContext } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import CartContext from "../../context/cart/CartContext";

const ItemsListComponent = () => {

    const { cartItems, removeFromCart } = useContext(CartContext);

    const renderItems = ({item}) => (
        <Box bg="white">
            <Box pl="4" pr="5" py="2">
                <HStack alignItems="center" space={3}>
                    <VStack>
                        <Text bold color="coolGray.800">{item.product.name}</Text>
                        <Text color="coolGray.600">
                            {item.additions?.map(add => (
                                <Badge colorScheme={add.addTo? 'success':'danger'}>{add.addition.name}</Badge>
                            ))}
                        </Text>
                    </VStack>
                    <Spacer />
                    <Text color="coolGray.800">X {item.qty}</Text>
                </HStack>
            </Box>
        </Box>
    );

    const renderHiddenItem = ({item}) => (
        <HStack flex="1" pl="2">
            <Pressable w="70" ml="auto" cursor="pointer" bg="red.500" justifyContent="center"
                _pressed={{opacity: 0.5}} onPress={() => removeFromCart(item.product)}>
                    <VStack alignItems="center" space={2}>
                        <DeleteIcon color="white" />
                        <Text color="white" fontSize="xs" fontWeight="medium">
                            eliminare
                        </Text>
                    </VStack>
                </Pressable>
        </HStack>
    )

    return (
        <Box>
            <SwipeListView
                keyExtractor={item => item.product.id}
                data={cartItems}
                renderItem={renderItems}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-130}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
            />
        </Box>
    )
}

export default ItemsListComponent;