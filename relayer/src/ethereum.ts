import { Network, Alchemy, Wallet } from "alchemy-sdk";
// import ether
import dotenv from "dotenv";
  
export async function  getAccount() {
    dotenv.config();
    const privKey = process.env["PRIVATE_KEY"];
    if (privKey === undefined) {
        return "";

    } else {
        let wallet = new Wallet(privKey);
        console.log('address is: ', wallet.address);
        return wallet.address;
    }
    
}