import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

export const mint = async (contractAddress, metadatas, price) => {
  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();

  const wallet_address = new ethers.providers.Web3Provider(window.ethereum)
    .getSigner()
    .getAddress();

  const wallet_address_string = (await wallet_address).toString();

  const sdk = ThirdwebSDK.fromSigner(signer, "mumbai", {
    clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
  });
  const contract = await sdk.getContract(contractAddress);

  const tx = await contract.erc721.lazyMint(metadatas); //using the NFT Collection contract
  /* const receipt = tx.receipt; // the transaction receipt
  const tokenId = tx.id; // the id of the NFT minted
  const nft = await tx.data(); // (optional) fetch details of minted NFT */
  const tokenId = tx[0].id; // token id of the first created NFT
  const nft = await tx[0].data(); // (optional) fetch details of the first created NFT

  //console.log(receipt, tokenId, nft);
  console.log(tokenId, nft);

  const presaleStartTime = new Date(Date.now());
  const publicSaleStartTime = new Date(Date.now());
  const claimConditions = [
    /*     {
      startTime: presaleStartTime, // start the presale now
      //maxClaimableSupply: 5, // limit how many mints for this presale
      price: 0.0, // presale price
      maxClaimablePerWallet: 1, // limit how many mints per wallet
      snapshot: ["0x...", "0x..."], // limit minting to only certain addresses
    }, */
    {
      startTime: publicSaleStartTime, // 24h after presale, start public sale
      maxClaimablePerWallet: 1, // limit how many mints per wallet
      price: price, // public sale price
    },
  ];
  await contract.erc721.claimConditions.set(claimConditions);

  const quantity = 1; // how many unique NFTs you want to claim

  const txx = await contract.erc721.claimTo(wallet_address_string, quantity);
  const receipt = txx.receipt; // the transaction receipt
  const claimedTokenId = txx.id; // the id of the NFT claimed
  //const claimedNFT = await txx.data(); // (optional) get the claimed NFT metadata

  console.log("claim function last execeuted");

  return txx;
};
