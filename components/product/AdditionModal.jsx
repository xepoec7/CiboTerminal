import { Badge, Box, Button, Center, HStack, Modal, Pressable, Text } from "native-base";
import React, { useEffect, useState } from "react";
import Api from "../../services/ApiService";

const AdditionModal = (props) => {

    const [selectedAdd, setSelectedAdd] = useState([]);
    const topings = props.topings;


    const addToSelected = (addition) => {
        let order_addition = {order_item: 0, addition: addition, addTo: true};
        if (!selectedAdd.find((item) => item.addition.id === addition.id)) {
            setSelectedAdd([...selectedAdd, order_addition]);
        } else {
            selectedAdd.find((item) => {
                if (item.addition.id === addition.id) {
                    item.addTo = !item.addTo;
                }
            });
        }
    }

    const addAdditionToOrder = () => {
        props.setAdditions(selectedAdd);
        props.setShow(!props.show);
    }

    return (
        <Modal isOpen={props.show} onClose={() => props.setShow(false)} size="full">
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Supplementi</Modal.Header>
                <Modal.Body>
                    <Center>
                        <Box>
                            <HStack space={1}>
                                <Text>selezionato:</Text>
                                {selectedAdd.map((sel) => (
                                    <Badge key={sel.addition.id} colorScheme={sel.addTo? "success":"danger"}>{sel.addition.name}</Badge>
                                ))}
                            </HStack>
                        </Box>
                        <Box marginTop={5}>
                            <HStack space={3} flexWrap="wrap">
                                {topings.map(top => (
                                    <Pressable pt="3" key={top.id} onPress={() => addToSelected(top)}>
                                        <Badge pt="2" pb="2" colorScheme="warning">{top.name}</Badge>
                                    </Pressable>
                                ))}
                            </HStack>
                        </Box>
                    </Center>
                </Modal.Body>
                <Modal.Footer>
                    <Button onPress={() => addAdditionToOrder()}>Aggiungi allegati</Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}

export default AdditionModal;