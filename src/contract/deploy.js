import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

export const deployContract = async (name, description, image) => {  
  const signer = new ethers.providers.Web3Provider(
    window.ethereum
  ).getSigner();
  
  const wallet_address = new ethers.providers.Web3Provider(window.ethereum)
    .getSigner()
    .getAddress();

  const wallet_address_string = (await wallet_address).toString();
  console.log("wallet address: ", wallet_address_string)

  const sdk = ThirdwebSDK.fromSigner(signer, "mumbai", {
    clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
  });

  const txResult = await sdk.deployer.deployBuiltInContract("nft-collection", {
    //required
    name: name,
    primary_sale_recipient: wallet_address_string,
    //optional
    description: description,
    image: image, //album image art
  });
  console.log('collection contract address: https://thirdweb.com/mumbai/'+ txResult);
  return txResult;
};