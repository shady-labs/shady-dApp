import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import SearchPage from "../pages/SearchPage";
import { NavLink, useNavigate } from "react-router-dom";

const HeaderSearch = ({ handleQuery }) => {
  const [searchQuery, setSearchQuery] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // handleSearch(searchQuery);
      handleQuery(searchQuery);
      //console.log("Searchbar Query: ", searchQuery);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);
  const navigate = useNavigate();

  return (
    <Stack spacing={4}>
      <InputGroup>
        <InputLeftAddon
          background={"black"}
          border={"1px"}
          borderColor={"gray.300"}
          onClick={() => {
            if (
              searchQuery != "" &&
              searchQuery != null &&
              searchQuery != undefined &&
              searchQuery.length > 0 &&
              searchQuery != " " 
            ) {
              navigate("/search/" + searchQuery);
            }
          }}
        >
          <BsSearch color="gray.300" />
        </InputLeftAddon>
        <Input
          border="1px"
          focusBorderColor="#fff"
          borderColor="zinc.300"
          placeholder="Search Songs, Albums, Artists or Podcasts"
          w="full"
          outline={0}
          bg="transparent"
          onChange={async (e) => {
            setSearchQuery(e.target.value);
            console.log("Search Query: ", searchQuery);
          }}
          p={2}
        />
      </InputGroup>
    </Stack>
  );
};

export default HeaderSearch;
