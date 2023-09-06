import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const UploadLayout = () => {
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();

	/* useEffect(() => {
		if (user) {
			navigate("/home");
		}
	}, [user]); */
	return (
		<main>
			<Flex
				align="center"
				justify="flex-start"
				bg="zinc.800"
				p={4}
				pl={6}
				h={{ base: "full", md: "5rem" }}>
				<Flex align="center" color="accent.main" justify="flex-start" gap={2}>
					<Heading
						fontWeight="semibold"
						color="gray.200"
						fontSize={{ base: "lg", md: "2xl" }}>
						shady
					</Heading>
				</Flex>
			</Flex>
			<Box bg="zinc.950" h="full" minH="91vh">
				<Outlet />
			</Box>
		</main>
	);
};

export default UploadLayout;
