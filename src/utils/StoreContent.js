import { ThirdwebStorage } from "@thirdweb-dev/storage";

const storage = new ThirdwebStorage({
    clientId:import.meta.env.VITE_THIRDWEB_CLIENT_ID,
    secretKey:import.meta.env.VITE_THIRDWEB_SECRET_KEY,
});

export const StoreContent = async (files) => {
  console.log("Uploading Audio to IPFS with thirdweb....");
  const upload = await storage.upload(files);
  const trim_upload = upload.split("ipfs://")[1];
  /* const cid = `https://w3s.link/ipfs/${trim_upload}/`;
  console.log("track_url: ",cid); */
  const cid = storage.resolveScheme(upload);
  console.log("stored files with cid:", cid);
  /* const json_cid = await storage.downloadJSON(upload);
  console.log(json_cid); */
  /* console.log(typeof cid); */
  /* const parsedData = JSON.stringify(cid);
  console.log("track url: ",parsedData);
  const finalll= JSON.parse(parsedData);
  console.log("FINALLLLLLLLL: ",finalll); */

  // get value from JSON object in JavaScript
  /* console.log(parsedData.employee.name); */

  return cid;
};