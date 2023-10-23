import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

export const signer  = new ethers.providers.Web3Provider(window.ethereum).getSigner();

export const sdk = ThirdwebSDK.fromSigner(
  signer,
  "mumbai",
 {
  clientId:import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});

const metadata = {
  name: "UTOPIA",
  description: "...",
  primary_sale_recipient: "0x90269D31311a0FEB0907b7DAAc0b9D1234c85709",
}

export const deployContract = async (name, recipient, description, ipfsUrl) => {
    const txResult = await sdk.deployer.deployBuiltInContract("nft-collection", metadata);
    console.log (txResult);
};