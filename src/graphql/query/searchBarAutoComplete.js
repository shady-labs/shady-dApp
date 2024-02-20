import { gql } from '@apollo/client'
import { client } from '../../main'
import { useState } from 'react'

export const searchBarAutoComplete = async search => {
  // console.log('entered searchBarAutoComplete function')
  //const [data, setData] = useState([]);
  var data = []
  // console.log('Input search Query: ', search)
  try {
    if (search != '' && search != null && search != ' ') {
      //track name search
      await searchTrackByName(search).then(res => {
        data.push(res)
      })

      // artist name serach
      await searchArtistByName(search).then(res => {
        data.push(res)
      })

      // artist of track name search
      await searchArtistByTrackName(search).then(res => {
        data.push(res)
      })

      // track of artist name search
      await searchTrackByArtistName(search).then(res => {
        data.push(res)
      })
      // console.log('data: ', data)
    }
    console.log("[data0]: ",data[0][0])
    console.log("data3: ", data[3][0])
    data[3].map(track => {
      console.log("[track]: ",track)
      data[0] = [...data[0], track]
    })
    // console.log('data: ', data)
    return data
    
  } catch (err) {
    console.log(err)
  }
}

export const searchTrackByName = async search => {
  const GET_TRACKS_BY_NAME = gql`
    query GetTracksByName($name: String) {
      getTracksByName(name: $name) {
        _id
        name
        artistsID
        artistsName
        trackImage
        trackUrl
        genre
        duration
      }
    }
  `
  try {
    if (search != '' && search != null && search != ' ') {
      const { gqlloading, gqlerror, data } = await client.query({
        query: GET_TRACKS_BY_NAME,
        variables: {
          name: search
        }
      })
      // console.log(data['getTracksByName'].length)
      return data['getTracksByName']
    }
  } catch (err) {
    console.log(err)
  }
}

const searchArtistByName = async search => {
  const GET_ARTIST_BY_NAME = gql`
    query GetArtistsByName($name: String) {
      getArtistsByName(name: $name) {
        _id
        name
        image
        description
        genre
        tracksId
        tracksName
      }
    }
  `
  try {
    if (search != '' && search != null && search != ' ') {
      const { gqlloading, gqlerror, data } = await client.query({
        query: GET_ARTIST_BY_NAME,
        variables: {
          name: search
        }
      })
      // console.log(data['getArtistsByName'].length)
      return data['getArtistsByName']
    }
  } catch (err) {
    console.log(err)
  }
}

const searchArtistByTrackName = async search => {
  const GET_ARTIST_BY_TRACK_NAME = gql`
    query GetArtistByTrackName($name: String!) {
      getArtistByTrackName(name: $name) {
        _id
        name
        image
        description
        genre
        tracksId
        tracksName
      }
    }
  `
  try {
    if (search != '' && search != null && search != ' ') {
      const { gqlloading, gqlerror, data } = await client.query({
        query: GET_ARTIST_BY_TRACK_NAME,
        variables: {
          name: search
        }
      })
      // console.log(data['getArtistByTrackName'].length)
      return data['getArtistByTrackName']
    }
  } catch (err) {
    console.log(err)
  }
}

export const searchTrackByArtistName = async search => {
  // console.log('entered searchTrackByArtistName function', search)
  const GET_TRACK_BY_ARTIST_NAME = gql`
    query GetTracksByArtistName($name: String!) {
      getTracksByArtistName(name: $name) {
        _id
        name
        artistsID
        artistsName
        trackImage
        trackUrl
        genre
        duration
      }
    }
  `
  try {
    if (search != '' && search != null && search != ' ') {
      const { gqlloading, gqlerror, data } = await client.query({
        query: GET_TRACK_BY_ARTIST_NAME,
        variables: {
          name: search
        }
      })
      // console.log(data['getTracksByArtistName'].length)
      return data['getTracksByArtistName']
    }
  } catch (err) {
    console.log(err)
  }
}
