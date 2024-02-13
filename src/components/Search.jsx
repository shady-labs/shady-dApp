import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { searchBarAutoComplete } from "../graphql/query/searchBarAutoComplete";
import SearchPage from "../pages/SearchPage";

const Search = ({handleQuery, isSearchPage,inputQuery}) => {
  const [searchQuery, setSearchQuery] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // handleSearch(searchQuery);
      handleQuery(searchQuery);
      //console.log("Searchbar Query: ", searchQuery);
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])
  
  return (
    
    <Box mb={6} pb={4} borderBottom="1px" borderBottomColor="zinc.600">
      <InputGroup>
        <InputLeftAddon color="#E5B8F4"
          onClick={
            () => {
              if(isSearchPage==true){
                handleQuery(searchQuery)
              }
              else{
                SearchPage
              }
            }
          }
        >
          <BsSearch background="#000" color="black" />
        </InputLeftAddon>
        <Input
          border="1px"
          focusBorderColor="zinc.300"
          borderColor="zinc.300"
          placeholder="Search Songs, Albums, Artists or Podcasts"
          w="30vw"
          outline={0}
          bg="transparent"
          onChange={async (e) => {
            setSearchQuery(e.target.value);
          }}
          defaultValue={inputQuery}
          p={2}
        />
      </InputGroup>
    </Box>
  );
};

export default Search;
