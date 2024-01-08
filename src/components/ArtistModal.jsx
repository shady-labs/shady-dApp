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

export default function ArtistModal() {

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay] = React.useState(<OverlayOne />);

  const [artistName, setArtistName] = useState([]);
  const [walletAddress, setWalletAddress] = useState([]);
  const [emailAddress, setEmailAddress] = useState([]);
  const [description, setDescription] = useState([]);
  const [country, setCountry] = useState([]);

  return (
    <>
      <Button
        bg="accent.light"
        _hover={{ opacity: 0.8 }}
        onClick={() => {
          <OverlayOne />;
          onOpen();
        }}
      >
        <Avatar
          size="md"
          src="https://img.freepik.com/premium-photo/gorilla-wearing-pair-headphones-with-purple-background_962508-4153.jpg"
        />
        Join as Artist!
      </Button>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        variant="purple"
      >
        {overlay}
        <ModalContent bg="#0c0e13" color="white" borderRadius="25px">
          <ModalHeader>
            {/* <Avatar
          size="md"
          src="https://shadylabs.xyz/logo.svg"
        /> */}
            Artists Lab on Shady
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="zinc.400">
                Artist Name
              </FormLabel>
              <InputGroup borderColor="zinc.400" rounded="base">
                <Input
                  type="text"
                  color="zinc.300"
                  fontSize="sm"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  placeholder="e.g. Drake"
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired pt={3}>
              <FormLabel fontSize="sm" color="zinc.400">
                Wallet Address
              </FormLabel>
              <InputGroup borderColor="zinc.400" rounded="base">
                <Input
                  type="text"
                  color="zinc.300"
                  fontSize="sm"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="e.g. 0x1234567890abcdef"
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired pt={3}>
              <FormLabel fontSize="sm" color="zinc.400">
                Email Address
              </FormLabel>
              <InputGroup borderColor="zinc.400" rounded="base">
                <Input
                  type="text"
                  color="zinc.300"
                  fontSize="sm"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="e.g. email@domain.com"
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired pt={3}>
              <FormLabel fontSize="sm" color="zinc.400">
                Enter your description here
              </FormLabel>
              <Textarea
                border="1px"
                borderColor="zinc.600"
                height="170px"
                rounded="base"
                variant="outline"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. I am a singer, songwriter, and producer from Toronto, Canada. I am known for my unique blend of rap and R&B, and working closely with OVO Sound, the record label I co-founded in 2012."
                size="sm"
              />
            </FormControl>

            <FormControl isRequired pt={3}>
              <FormLabel fontSize="sm" color="zinc.400">
                Select country
              </FormLabel>
              <Select
                border="1px"
                borderColor="zinc.600"
                rounded="base"
                placeholder="Select"
                variant="outline" color="zinc.300"
                fontSize="sm"
              >
                <option>India</option>
                <option>United States</option>
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
