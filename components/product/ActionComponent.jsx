import { useNavigation } from "@react-navigation/native";
import { Badge, Box, Button, Center, HStack, Input, Text } from "native-base";
import React, { useContext, useState } from "react";
import CartContext from '../../context/cart/CartContext';
import AdditionModal from "./AdditionModal";

const ActionComponent = (props) => {

    const { addToCart } = useContext(CartContext);
    const navigate = useNavigation();
    const product = props.product;
    const [additions, setAdditions] = useState([]);
    const [additionModal, setAdditionModal] = useState(false);
    const [qty, setQty] = useState(1);


    const toCart = () => {
        addToCart({product: product, additions: additions}, qty)
        navigate.navigate("OrderScreen");
    }


    return (
        <Center alignItems={"center"} safeAreaTop>
            <HStack space={5}>
                <Box>
                    <HStack space={1} justifyContent="center">
                        <Text>supplementi:</Text>
                        {additions.map(add => (
                            <Badge key={add.addition.id} colorScheme={add.addTo? "success":"danger"}>{add.addition.name}</Badge>
                        ))}
                    </HStack>

                    <AdditionModal topings={props.topings} show={additionModal} setShow={setAdditionModal}  setAdditions={setAdditions} />

                    <Button colorScheme={"emerald"} onPress={() => setAdditionModal(true)} mt="5" mb="5">supplementi</Button>
                    <HStack space={5} justifyContent="center">
                        <Button colorScheme={"emerald"} onPress={() => qty > 1? setQty(qty-1): qty}>-</Button>
                        <Input value={qty.toString()}
                            textAlign="center"
                            onChangeText={(val) => parseInt(setQty(val))}
                            keyboardType="numeric" 
                            size="lg" 
                            placeholder="inserisci la quantità"
                            width={20} />
                        <Button colorScheme={"emerald"} onPress={() => setQty(qty +1)} >+</Button>
                    </HStack>
                    <Button
                        onPress={() => toCart()}
                        bg={"success.500"}
                        marginTop={5}
                    >
                        aggiungere
                    </Button>
                </Box>
            </HStack>
        </Center>
    )
}

export default ActionComponent;