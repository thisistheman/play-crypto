// Setup
import { Network, Alchemy } from "alchemy-sdk";
import dotenv from "dotenv";

const main = async () => {
    dotenv.config();
    const mnemonic = process.env["MNEMONIC"];
const apiKey = process.env["API_KEY"];

    console.log('api key is ', apiKey);
    const settings = {
        apiKey: apiKey,
  network: Network.ETH_GOERLI,
    };
  const alchemy = new Alchemy(settings);

  // Get the latest block
  const latestBlock = await alchemy.core.getBlockNumber();

  console.log("last block is ", latestBlock);

  console.log("main function");
};

main()
  .then(() => {
    console.log("exits with success");
    process.exit(0);
  })
  .catch((err) => {
    console.log("error is ", err);
    process.exit(1);
  });
