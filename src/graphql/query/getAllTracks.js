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

export const getAllTracks = async () => {
  try {
      const { gqlloading, gqlerror, data } = await client.query({
        query: GET_ALL_TRACKS,
        variables: {
        },
      });
      // console.log("[top tracks]: "+data["getAllTracks"][0]);
      return data["getAllTracks"];
  } catch (err) {
    console.log(err);
  }
};
