// Setup
import { Network, Alchemy } from "alchemy-sdk";
import dotenv from "dotenv";
import {getAccount} from "./src/ethereum";
import {getBasic} from "./src/cosmos";

const main = async () => {
    try {
        dotenv.config();
    const mnemonic = process.env["MNEMONIC"];
    const apiKey = process.env["API_KEY"];

    await getBasic();

    console.log("api key is ", apiKey);
    const settings = {
        apiKey: apiKey,
        network: Network.ETH_GOERLI,
    };
    const alchemy = new Alchemy(settings);
    const address = getAccount();
    const balance = await alchemy.core.getBalance(address);
    console.log('balance is: ', balance.toString());

    // Get the latest block
    const latestBlock = await alchemy.core.getBlockNumber();
    const transactions = (await alchemy.core.getBlock(latestBlock - 10)).transactions;

    console.log("there are %d transactions in block ", transactions.length);

    // for (const tx of transactions) {
    //     const transaction = await alchemy.core.getTransaction(tx);
    //     console.log('', transaction?.hash);

    //      const receipt = await alchemy.core.getTransactionReceipt(tx);
    //     if (receipt != null) {
    //         console.log("address is ", receipt.contractAddress);
    //     };
    // }
    
    
}   catch {

}

  
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
