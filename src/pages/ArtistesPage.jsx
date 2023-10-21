/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import ArtistCard from '../components/ArtistCard'
import { Box, Grid, Heading, Text } from '@chakra-ui/react'
import { getAllArtists } from '../graphql/query/getAllArtists'

const ArtistesPage = () => {
  const [allArtists, setallArtists] = useState([
    {
      _id: '',
      name: 'loading...',
      image: 'loading...',
      url: 'loading...'
    }
  ])
  const [fetched, setFetched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!fetched) {
      setIsLoading(true)
      getAllArtists().then(res => {
        setallArtists(res)
        setFetched(true)
        setIsLoading(false)
      })
    }
  }, [])
  return (
    <Box
      p={6}
      pb={32}
      minH='100vh'
      pt={{ base: 20, md: 6 }}
      pl={{ base: 4, md: 14, xl: 0 }}
    >
      <Box mb={6}>
        <Heading
          fontSize={{ base: 'xl', md: '2xl' }}
          fontWeight='semibold'
          mb={{ base: 1, md: 3 }}
        >
          Artistes
        </Heading>
        <Text fontSize='sm' color='zinc.400'>
          Discover new artistes
        </Text>
      </Box>
      <Grid
        templateColumns={{
          base: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
          xl: 'repeat(5, 1fr)'
        }}
        gap={6}
      >
        {allArtists.map(artist => (
          <ArtistCard key={artist._id} artist={artist} />
        ))}
      </Grid>
    </Box>
  )
}

export default ArtistesPage
