import { gql } from "@apollo/client";
import { client } from "../../main";

const GET_ALL_TRACKS = gql`
query GetAllTracks {
  getAllTracks {
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
`;

export const getAllTracks = async (name) => {
  try {
    if (name != "" && name != null) {
      const { gqlloading, gqlerror, data } = await client.query({
        query: GET_ALL_TRACKS,
        variables: {
          name: name,
        },
      });
      console.log(data["getAllTracks"][0]);
      return data["getAllTracks"][0];
    }
  } catch (err) {
    console.log(err);
  }
};
