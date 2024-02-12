import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputLeftElement, Spinner, Box, Icon, BoxProps, InputRightElement, Flex, Text } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { searchBarAutoComplete } from '../graphql/query/searchBarAutoComplete';
import { gql } from '@apollo/client'
import { client } from '../main'
import { getArtistsByName } from "../graphql/query/getArtistsByName";
import { getAllTracks } from '../graphql/query/getAllTracks';

interface Props extends BoxProps {
	value: string;
	isLoading: boolean;
	onSearchChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
	resultRenderer: ( result: any ) => JSX.Element;
	searchResult: ( resultData: any )=> JSX.Element;
	onResultSelect: ( resultData: any ) => void;
	resultListMaxHeight?: string;
	searchResults?: any[];
	placeholder?: string;
	input?: { iconPosition: 'left' | 'right'; };
	noResultFoundText?: string;
}

export const Search = ( props: Props ) => {

	const {
		value,
		isLoading,
		input,
		onSearchChange,
		resultRenderer,
		onResultSelect,
		resultListMaxHeight = '60vh',
		placeholder = '',
		searchResults = [],
		noResultFoundText = 'No results found.',
		...rest
	} = props;

	const { iconPosition = 'left' } = input || {};

	const [ showResults, setShowResults ] = useState( false );
	
	const [ artistName, setArtistName ] = useState("");
	const [artistNotFound, setArtistNotFound] = useState(false);
	const [artist, setArtist] = useState([]);
	
	const handleQuery = async (value) => {
		try {
		  searchBarAutoComplete(value).then((data) => {
			if (data == null || data == undefined) {
			  setArtistNotFound(true);
			} else {
			  setArtistNotFound(false);
			}
		  });
		} catch (err) {
		  console.log(err);
		}
	};

	const onBlur = () => {
		setTimeout( () => {
			setShowResults( false );
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
					/>
				}

				<Input
					borderColor="rgba(34,36,38,.15)"
					borderRadius="full"
					placeholder={ placeholder }
					value={ value }
					onChange={(e) => {
						setArtistName(e.target.value)
						handleQuery(e.target.value).then((data) => {
						//   setArtist(data);
						});
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
									<Box
										key={ result.id || result._id || result.key }
										borderBottom="1px solid rgba(34,36,38,.1)"
										cursor="pointer"
										_hover={ {
											bgColor: '#f9fafb'
										} }
										onClick={ () => onResultSelect( result ) }
									>
										<Flex alignItems="center">
											<Box p="0.8em" margin="0" color="black">
												{ resultRenderer( result ) }
												
											</Box>
										</Flex>
									</Box>
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