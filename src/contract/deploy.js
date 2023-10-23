import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

// TO-DO: if wallet is connected then fetch signer and wallet address 
export const signer  = new ethers.providers.Web3Provider(window.ethereum).getSigner();
export const wallet_address  = new ethers.providers.Web3Provider(window.ethereum).getSigner().getAddress();

export const sdk = ThirdwebSDK.fromSigner(
  signer,
  "mumbai",
 {
  clientId:import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});

const metadata = {
  //required
  name: "UTOPIA",
  primary_sale_recipient: wallet_address,

  //optional
  description: "...",
  image: "..." //album image art
}

export const deployContract = async (name, recipient, description, ipfsUrl) => {
    const txResult = await sdk.deployer.deployBuiltInContract("nft-collection", metadata);
    console.log (txResult);
};