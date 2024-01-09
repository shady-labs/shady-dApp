

import { gql} from "@apollo/client";
import { client } from "../../main";

const USER_INPUT = gql`
mutation AddUser($userInput: UserInput) {
  addUser(userInput: $userInput) {
    address
    email
    image
    isArtist
    name
    region
    _id
  }
}
`;

export const addUser = async (name, isArtist, image, address, region) => {
    try {
        console.log("name: "+name+" isArtist "+isArtist+" image "+image+" region "+region)
        const { gqlloading, gqlerror, data } = await client.mutate({
        mutation: USER_INPUT,
        variables: {
            "userInput": {
                "name": name,
                "isArtist": isArtist,
                "image": image,
                "address": address,
                "region": "india"        
            }
        }
      });
      console.log(data);
      return data;
    } 
    catch(err) {
      console.log(err);
    }	
};