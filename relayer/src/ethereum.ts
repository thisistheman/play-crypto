import { Network, Alchemy, Wallet } from "alchemy-sdk";
// import ether
import { Contract, BaseContract, ethers, utils } from "ethers";

import dotenv from "dotenv";
import { readFileSync } from "fs";
  
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function  getWallet() {
    dotenv.config();
    const privKey = process.env["PRIVATE_KEY"];
    if (privKey === undefined) {
        return "";

    } else {
        let wallet = new Wallet(privKey);
        console.log('address is: ', wallet.address);
        if (wallet.address === undefined) {
            console.log("wallet address is undefined");
            throw new Error("wallet address is undefined");
        }
        return wallet;
    }
    
}

export async function getContract(alchemyKey: string) {
    console.log('into getContract ');
    const content = readFileSync("src/erc20.json");

    const ABI = JSON.parse(content.toString())['abi'];

    const abi = new ethers.utils.Interface(ABI);

    let alchemyUrl = `wss://eth-goerli.g.alchemy.com/v2/` + alchemyKey;
    const provider = new ethers.providers.WebSocketProvider(alchemyUrl);
    const from = 8721240;
    const to = 8721250;

    const filter = [utils.id('Transfer(address,address,uint256)')];

    console.log('filter is: ', filter);

    const logs = await provider.getLogs({
        fromBlock: 8721249,
        toBlock: 8721250,
        address: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
        topics: [filter],

    })
   
    logs.forEach(log => {   
        let parsedLog = abi.parseLog(log);
        console.log('logs is: ', parsedLog);
    });

}