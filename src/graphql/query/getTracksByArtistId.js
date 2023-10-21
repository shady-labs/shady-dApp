import { gql} from "@apollo/client";
import { client } from "../../main";



const GET_TRACKS_BY_ARTIST_ID = gql`
    query GetTracksByArtistId($id: ID!) {
        getTracksByArtistId(ID: $id) {
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

export const getTracksByArtistId = async (id) => {
    try {
        console.log("getTracksByArtistId called")
        if(id != "" && id != null){
                const { gqlloading, gqlerror, data } = await client.query({
                query: GET_TRACKS_BY_ARTIST_ID,
                variables: {
                    id: id,
                },
            });
            console.log(data["getTracksByArtistId"].length);
            return data["getTracksByArtistId"];
        }
    } 
    catch(err) {
      console.log(err);
    }	
};