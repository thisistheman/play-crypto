// Setup
import { Network, Alchemy, Filter, Utils } from "alchemy-sdk";
import dotenv from "dotenv";
import {getWallet, getContract} from "./src/ethereum";
import {getBasic} from "./src/cosmos";

const main = async () => {
        dotenv.config();
    const mnemonic = process.env["MNEMONIC"];
    const apiKey = process.env["API_KEY"];

    if (apiKey == null) {
      return;
    }
    console.log("api key is ", apiKey);
    await getBasic();

    // await getContract(apiKey);

    // return;

    if (mnemonic !== null) {
      return;
    }

    console.log("api key is ", apiKey);
    const settings = {
        apiKey: apiKey,
        network: Network.ETH_GOERLI,
    };
    const alchemy = new Alchemy(settings);

    console.log('++++++ alchemy url is:', alchemy.config.url);

    const wallet = await getWallet();
    if (wallet === "") {
      return
    }

    const balance = await alchemy.core.getBalance(wallet.getAddress());
    console.log('balance is: ', balance.toString());

    // Get the latest block
    const latestBlock = await alchemy.core.getBlockNumber();
    const transactions = (await alchemy.core.getBlock(latestBlock - 10)).transactions;

    // https://emn178.github.io/online-tools/keccak_256.html
    const method = "Transfer(address,address,uint256)";
    const topic = "ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

    
    const filter: Filter = {
      fromBlock: 0,
      toBlock: 1,
      address: "",
      topics: [topic],
    };

    // Utils.

    let abi = [
      {
        constant: true,
        inputs: [],
        name: "get",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ];

    const contractABI = require('../contract-abi.json')
    const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A";

    // const helloWorldContract = new alchemy.core.getC(

    // };

    // let contractInterface = new Utils.Interface(abi);

    // define the transaction
    const transaction = {
      to: "0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd",
      value: Utils.parseEther("0.001"),
      gasLimit: "21000",
      maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
      maxFeePerGas: Utils.parseUnits("20", "gwei"),
      nonce: await alchemy.core.getTransactionCount(wallet.getAddress()),
      type: 2,
      data: "",
      chainId: 5, // Corresponds to ETH_GOERLI
    };

    let contract = alchemy.core.call(transaction);

  const rawTransaction = await wallet.signTransaction(transaction);
  const response = await alchemy.transact.sendTransaction(rawTransaction)


    const logs = await alchemy.core.getLogs(filter);

    console.log("there are %d transactions in block ", logs);

    
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
