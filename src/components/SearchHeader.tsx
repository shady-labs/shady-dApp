import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputLeftElement, Spinner, Box, Icon, BoxProps, InputRightElement, Flex, Text } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { searchBarAutoComplete } from '../graphql/query/searchBarAutoComplete';
import { gql } from '@apollo/client'
import { client } from '../main'
import { getArtistsByName } from "../graphql/query/getArtistsByName";
import { getAllTracks } from '../graphql/query/getAllTracks';
import { Link } from "react-router-dom";

interface Props extends BoxProps {
	value: string;
	// isLoading: boolean;
	onSearchChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
	resultRenderer: ( result: any ) => JSX.Element;
	// searchResult: ( resultData: any )=> JSX.Element;
	onResultSelect: ( resultData: any ) => void;
	resultListMaxHeight?: string;
	// searchResults?: any[];
	placeholder?: string;
	input?: { iconPosition: 'left' | 'right'; };
	noResultFoundText?: string;
}

export const Search = ( props: Props ) => {

	const {
		value,
		// isLoading,
		input,
		onSearchChange,
		resultRenderer,
		onResultSelect,
		resultListMaxHeight = '60vh',
		placeholder = '',
		noResultFoundText = 'No results found.',
		...rest
	} = props;
	const [isLoading, setIsloading] = useState(false);
	const { iconPosition = 'left' } = input || {};
	const [searchResults, setSearchResults] = useState([{
			"id": "",
			"title": "",
			"redirect": "",
			"icon_url": "",
			"description": "",
		},
	]);
	const [ showResults, setShowResults ] = useState( false );
	const [query, setQuery] = useState("");
	
	
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			console.log("search query: ",query)
			handleQuery(query);
		}, 100)
		return () => clearTimeout(delayDebounceFn)
	  }, [query])

	const handleQuery = async (value) => {
		try {
			if(value.length>0){
				setIsloading(true);
				await searchBarAutoComplete(value).then((data) => {
					searchResults.splice(0, searchResults.length)
					console.log("search query 2: ",value)
					if (data![0][0] !=null) {
						setIsloading(false);
						searchResults.splice(0, searchResults.length)
						console.log("came to not null")
						console.log(data![0])
					  data![0].map(track => {
						searchResults.push({
							id: track["_id"],
							title: track["name"],
							redirect: "",
							icon_url: "",
							description: track["artistsName"][0],
						});
					  })
					}
					else{
						setIsloading(false);
						searchResults.splice(0, searchResults.length)
						console.log("came to null")
						searchResults.push({
							id: "not found",
							title: "not found",
							redirect: "",
							icon_url: "",
							description: "",
						})
					}
				  });
			}
			else{
				setIsloading(false);
				searchResults.splice(0, searchResults.length)
			}
		} catch (err) {
		  console.log(err);
		}
	};

	const onBlur = () => {
		setTimeout( () => {
			setShowResults( false );
			setIsloading(false);
		}, 170 );
	};

	return (
		<Box
			position="relative"
			w="100%"
			{ ...rest }
		>
			<InputGroup mb="10px">
				{
					iconPosition === 'left' &&
					<InputLeftElement
						pointerEvents="none"
						children={
							isLoading
								? <Spinner size="sm" />
								: <Icon as={ FaSearch } />
						}
						onClick={
							async(e) => {
								document.location.href="/search";
							}
						}
					/>
				}

				<Input
					borderColor="rgba(34,36,38,.15)"
					borderRadius="full"
					placeholder={ placeholder }
					value={ value }
					onChange={async(e) => {
						// setArtistName(e.target.value)
						setIsloading(true);
						setQuery(e.target.value);
						// handleQuery(e.target.value);
						// handleQuery(e.target.value).then((data) => {
						// //   setArtist(data);
						// });
					  }}
					onFocus={ () => setShowResults( true ) }
					onBlur={ onBlur }
				/>

				{
					iconPosition === 'right' &&
					<InputRightElement
						pointerEvents="none"
						children={
							isLoading
								? <Spinner size="sm" />
								: <Icon as={ FaSearch } />
						}
						onClick={
							async(e) => {
								document.location.href="/search";
							}
						}
					/>
				}
			</InputGroup>
			{
				showResults && (
					<Box
						bgColor="white"
						maxHeight={ resultListMaxHeight }
						overflowY="auto"
						borderRadius="0.3em"
						boxShadow="0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);"
						sx={ {
							"&::-webkit-scrollbar": {
								display: 'none'
							}
						} }
					>
						{
							searchResults.length >= 0
								? searchResults.map( result => (
									<Link to={result.redirect}>
										<Box
											key={ result.id }
											borderBottom="1px solid rgba(34,36,38,.1)"
											cursor="pointer"
											_hover={ {
												bgColor: '#f9fafb'
											} }
											onClick={ () => {} }
										>
											<Flex alignItems="center">
												<Box p="0.8em" margin="0" color="black"

													bgColor="white"
													maxHeight={ resultListMaxHeight }
													overflowY="auto"
													borderRadius="0.3em"
													boxShadow="0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);"
													sx={ {
														"&::-webkit-scrollbar": {
															display: 'none'
														}
													} }
												>
													{ 
														
													}
														<Text fontWeight="medium" color="black">
															{result.title}
														</Text>
														<Text fontWeight="small" color="grey">
															{result.description}
														</Text>
												</Box>
											</Flex>
										</Box>
									</Link>
								) )
								: value.length > 0 && !isLoading && (
									<Box
										borderBottom="1px solid rgba(34,36,38,.1)"
									>
										<Flex alignItems="center" >
											<Box p="0.8em" margin="0" color="black">
												<Text>{ noResultFoundText }</Text>
											</Box>
										</Flex>
									</Box>
								)
						}
					</Box >
				)
			}
		</Box>
	);
};