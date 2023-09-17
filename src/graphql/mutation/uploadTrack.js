import { gql} from "@apollo/client";
import { client } from "../../main";

const TRACK_INPUT = gql`
  mutation Mutation($trackInput: TrackInput) {
  uploadTrack(trackInput: $trackInput) {
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

export const uploadTrack = async (cid, artistId, duration, genre, name, trackImage) => {
    try {
        console.log("function called")
        const { gqlloading, gqlerror, data } = await client.mutate({
        mutation: TRACK_INPUT,
        variables: {
            "trackInput": {
              "artistsId": artistId ? artistId:"65042d3d2ad56917e5fea179",
              "duration":duration? duration : 100,
              "genre": genre ? genre : "Pop",
              "name": name ? name : "temp name",
              "trackImage": trackImage? trackImage : "https://i.imgur.com/fBuldry.png",
              "trackUrl": cid ? cid : "sample track url",
          },
        },
      });
      console.log(data);
    } 
    catch(err) {
      console.log(err);
    }	
};