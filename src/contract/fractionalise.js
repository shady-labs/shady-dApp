import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { contractAbi } from "./contractAbi";

export const deployFractionalContract = async (name, symbol, collection_contract_address) => {  
  const signer = new ethers.providers.Web3Provider(
    window.ethereum
  ).getSigner();
  
  const wallet_address = new ethers.providers.Web3Provider(window.ethereum)
    .getSigner()
    .getAddress();

  const wallet_address_string = (await wallet_address).toString();

  const sdk = ThirdwebSDK.fromSigner(signer, "mumbai", {
    clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
  });

  const txResult = await sdk.deployer.deployPublishedContract(
    "0x90269D31311a0FEB0907b7DAAc0b9D1234c85709",
    "MyToken", [
    name, 
    symbol, 
    wallet_address_string,
    ]);
  console.log('fractional contract address: https://thirdweb.com/mumbai/'+ txResult);

  const collection_contract = await sdk.getContract(collection_contract_address);
  await collection_contract.erc721.setApprovalForAll(txResult, true);
  console.log("approval set");

  const contract = await sdk.getContract(txResult, contractAbi);
  const data = await contract.call("initialize", [collection_contract_address, "0", "100000"]);
  console.log("intialised! ", data);

  return txResult;
};