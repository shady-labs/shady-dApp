import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Avatar,
  FormControl,
  FormLabel,
  Select,
  Input,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";
import React, {useState} from "react";
import { addUser } from "../graphql/mutation/addUser";
import { ethers } from "ethers";

export default function CollectModal() {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Button
        //bg="accent.light"
        textColor={"blackAlpha.900"}
        _hover={{ opacity: 0.8 }}
        onClick={async () => {
          <OverlayOne />;
          onOpen();
        }}
      >
        Collect
      </Button>

      <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size='xs'
      >
        {overlay}
        
        <ModalContent bg="#0c0e13" color="white" borderRadius="15px" /* outlineColor={"white"} */>
          <ModalHeader>Collect this song</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={2} /> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
