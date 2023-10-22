import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// An example of a signer using the ethers library
import { ethers } from "ethers";
const signer = new ethers.Wallet(import.meta.env.VITE_PRIVATE_KEY);

const sdk = ThirdwebSDK.fromSigner(
  signer,
  "mumbai",
 {
  clientId:import.meta.env.VITE_THIRDWEB_CLIENT_ID,
  secretKey:import.meta.env.VITE_THIRDWEB_SECRET_KEY,
});

const metadata = {
  name: "UTOPIA",
  description: "...",
  primary_sale_recipient: "0x90269D31311a0FEB0907b7DAAc0b9D1234c85709",
}

export const deployContract = async (name, recipient, description, ipfsUrl) => {
    const txResult = await sdk.deployer.deployBuiltInContract("nft-drop", metadata);
    console.log (txResult);
};
