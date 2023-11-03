import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

export const mint = async (contractAddress, metaData) => {
  const signer = new ethers.providers.Web3Provider(
    window.ethereum
  ).getSigner();

  const sdk = ThirdwebSDK.fromSigner(signer, "mumbai", {
    clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
  });
  const contract = await sdk.getContract(contractAddress);

  const tx = await contract.erc721.mint(metaData); //using the NFT Collection contract
  const receipt = tx.receipt; // the transaction receipt
  const tokenId = tx.id; // the id of the NFT minted
  const nft = await tx.data(); // (optional) fetch details of minted NFT
  // const firstTokenId = tx[0].id; // token id of the first created NFT
  // const firstNFT = await tx[0].data(); // (optional) fetch details of the first created NFT

  console.log(receipt, tokenId, nft);
};
