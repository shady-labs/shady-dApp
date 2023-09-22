

import { gql} from "@apollo/client";
import { client } from "../../main";

const ARTIST_INPUT = gql`
mutation Mutation($artistInput: ArtistInput) {
  addArtist(artistInput: $artistInput) {
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

export const addArtist = async (description, genre, name, artistImage) => {
    try {
        const { gqlloading, gqlerror, data } = await client.mutate({
        mutation: ARTIST_INPUT,
        variables: {
                "artistInput": {
                  "description": description,
                  "genre": genre,
                  "image": artistImage,
                  "name": name
                }
        },
      });
      console.log();
      return data;
    } 
    catch(err) {
      console.log(err);
    }	
};