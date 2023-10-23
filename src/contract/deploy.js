import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

// TO-DO: if wallet is connected then fetch signer and wallet address
export const signer = new ethers.providers.Web3Provider(
  window.ethereum
).getSigner();
export const wallet_address = new ethers.providers.Web3Provider(window.ethereum)
  .getSigner()
  .getAddress();
 console.log(wallet_address)
export const sdk = ThirdwebSDK.fromSigner(signer, "mumbai", {
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});

const metadata = {
  //required
  name: "UTOPIA",
  primary_sale_recipient: wallet_address,

  //optional
  description: "...",
  image: "...", //album image art
};

export const deployContract = async (name, description, ipfsUrl) => {
  console.log("wallet address: ",(await wallet_address).toString())
  
  const txResult = await sdk.deployer.deployBuiltInContract("nft-collection", {
    //required
    name: name,
    primary_sale_recipient: (await wallet_address).toString(),
    //optional
    description: description,
    image: ipfsUrl, //album image art
  });
  console.log(txResult);
  return txResult;
};
