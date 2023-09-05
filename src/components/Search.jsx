import { Box, Input, InputGroup, InputLeftAddon, InputRightElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const Search = () => {
	return (
    <Box mb={6} pb={4} borderBottom="1px" borderBottomColor="zinc.600">
      <InputGroup>
        <InputLeftAddon color="#E5B8F4">
          <BsSearch background="#000" color="black" />
        </InputLeftAddon>
        <Input
          border="1px"
          focusBorderColor="#fff"
          borderColor="zinc.700"
          placeholder="Search Songs, Albums, Artists or Podcasts"
          w="full"
          outline={0}
          bg="transparent"
          p={2}
        />
      </InputGroup>
    </Box>
  );
};

export default Search;
