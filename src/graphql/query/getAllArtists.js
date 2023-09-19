import { gql } from "@apollo/client";
import { client } from "../../main";

const GET_ALL_ARTISTS = gql`
query GetAllArtists {
  getAllArtists {
    _id
    name
    image
    description
    genre
    tracksId
    tracksName
  }
}
`;

export const getAllArtists = async () => {
  try {
      const { gqlloading, gqlerror, data } = await client.query({
        query: GET_ALL_ARTISTS,
        variables: {
        },
      });
      // console.log(data["getAllArtists"][0]);
      return data["getAllArtists"];
  } catch (err) {
    console.log(err);
  }
};
