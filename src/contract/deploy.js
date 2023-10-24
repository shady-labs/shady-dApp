import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

export const deployContract = async (name, description, ipfsUrl) => {  
  const signer = new ethers.providers.Web3Provider(
    window.ethereum
  ).getSigner();
  
  const wallet_address = new ethers.providers.Web3Provider(window.ethereum)
    .getSigner()
    .getAddress();

  console.log("wallet address: ",(await wallet_address).toString())

  const sdk = ThirdwebSDK.fromSigner(signer, "mumbai", {
    clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
  });

  const txResult = await sdk.deployer.deployBuiltInContract("nft-collection", {
    //required
    name: name,
    primary_sale_recipient: (await wallet_address).toString(),
    //optional
    description: description,
    image: ipfsUrl, //album image art
  });
  console.log("https://thirdweb.com/mumbai/", txResult);
  return txResult;
};