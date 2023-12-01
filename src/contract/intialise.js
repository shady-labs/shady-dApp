import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { contractAbi } from "./contractAbi";

export const initialise = async (collection_contract_address/* , tokenId, amount */) => {
  const signer = new ethers.providers.Web3Provider(
    window.ethereum
  ).getSigner();

  const sdk = ThirdwebSDK.fromSigner(signer, "mumbai", {
    clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
  });
  const contractAddress = await sdk.getContract(collection_contract_address);
  contractAbi={contractAbi}
  const contract = await sdk.getContractFromAbi(collection_contract_address, contractAbi);
  const data = await contract.call("initialize", [collection_contract_address, "0", "100000"]);
  console.log("intialised! ", data);
};
