import { gql } from "@apollo/client";
import { client } from "../../main";

const GET_ARTIST_BY_NAME_QUERY = gql`
  query Query($name: String) {
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
`;

export const getArtistsByName = async (name) => {
  try {
    if (name != "" && name != null) {
      const { gqlloading, gqlerror, data } = await client.query({
        query: GET_ARTIST_BY_NAME_QUERY,
        variables: {
          name: name,
        },
      });
      console.log("getArtistByName returning: "+data["getArtistsByName"][0]);
      return data["getArtistsByName"][0];
    }
  } catch (err) {
    console.log(err);
  }
};
