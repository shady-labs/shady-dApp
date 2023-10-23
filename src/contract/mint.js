import { sdk } from "./deploy.js";

// Address of the wallet you want to mint the NFT to
/* const walletAddress = "0x90269D31311a0FEB0907b7DAAc0b9D1234c85709"; */

// Custom metadata of the NFT, note that you can fully customize this metadata with other properties.
const metadatas = 
  {
    name: "MY EYES",
    description: "look at my eyes",
    image:
      "ipfs://bafybeiff76lkm5luuuaquqeubacshhwxrss7kpfbuvspvwwkstwu2eqoly/Travis%20Scott%20-%20Utopia.webp", // This can be an image url or file
    animation_url:
      "ipfs://bafybeihftxryi5ceqvyqowxbaf7lzfumwb2ohuxkxjxppmtmk75oos5aem/MY%20EYES.mp3",
  };

export const mint = async (contractAddress, metaData) => {
  const contract = await sdk.getContract(contractAddress);

  const tx = await contract.erc721.mint(metaData);
  const receipt = tx.receipt; // the transaction receipt
  const tokenId = tx.id; // the id of the NFT minted
  const nft = await tx.data(); // (optional) fetch details of minted NFT
  // const firstTokenId = tx[0].id; // token id of the first created NFT
  // const firstNFT = await tx[0].data(); // (optional) fetch details of the first created NFT

  console.log(receipt, tokenId, nft);
};
