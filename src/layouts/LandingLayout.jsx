import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { BiMusic } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const LandingLayout = () => {


	return (
        
            <Box bg="zinc.950" h="full" minH="100vh" w="full" minW="100vw" 
            p={4} display="flex" justifyContent="center" alignItems="center" 
            flexDirection="column" background="url('/ShadyLandingBackground.png')"
            backgroundSize="cover" backgroundPosition="bottom" backgroundRepeat="no-repeat" >
                <Button
                    size="lg"
                    variant="solid"
                    color={"white"}
                    borderRadius={35}
                    bgColor={"#810CA8"}
                    _hover={{ 
                        bg: "#F0F0F0",
                        color: "#000000",
                        transform: "scale(1.05)",
                    }}
                    _active={{
                        bg: "#810CA8",
                    }}
                    onClick={() => {
                        window.location.href = "/home";
                    }} 
                >Stream Shady</Button>
            </Box>
  );
};

export default LandingLayout;
