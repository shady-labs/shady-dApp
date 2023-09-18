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

export const getAllArtists = async (name) => {
  try {
    if (name != "" && name != null) {
      const { gqlloading, gqlerror, data } = await client.query({
        query: GET_ALL_ARTISTS,
        variables: {
          name: name,
        },
      });
      console.log(data["getAllArtists"][0]);
      return data["getAllArtists"][0];
    }
  } catch (err) {
    console.log(err);
  }
};
