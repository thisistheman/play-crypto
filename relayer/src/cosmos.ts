import {
  DirectSecp256k1HdWallet,
  makeCosmoshubPath,
  SigningCosmWasmClient,
  utils,
} from "cosmwasm";
import { GasPrice, StargateClient } from "@cosmjs/stargate";

import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx"
import { toHex, getTxHash } from "alchemy-sdk";

import dotenv from "dotenv";
import { sha256 } from "@cosmjs/crypto";

export async function getBasic() {
  dotenv.config();
  const prefix = "archway";
  const mnemonic = process.env["MNEMONIC"];
  const chainId = "constantine-1";
  const rpcEndpoint = "https://rpc.constantine-1.archway.tech";
  const hdPath = makeCosmoshubPath(0);
  const gasPrice = GasPrice.fromString("0.25uconst");
  const feeToken = "uconst";

  if (mnemonic === undefined) {
    return;
  }

  // Setup signer
  const offlineSigner = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix,
    hdPaths: [hdPath],
  });
  const { address } = (await offlineSigner.getAccounts())[0];
  console.log(`Connected to ${address}`);

  // Init SigningCosmWasmClient client
  const client = await SigningCosmWasmClient.connectWithSigner(
    rpcEndpoint,
    offlineSigner,
    {
      prefix,
      gasPrice,
    }
  );
  const balance = await client.getBalance(address, feeToken);
  console.log(`Balance: ${balance.amount} ${balance.denom}`);

  
  const block = await client.getBlock(1096910);
  
  block.txs.forEach(tx => {
    
    const txHash = utils.getTxHash(tx);
    

    // const faucetTx = Tx.decode(tx);
    // const messages = faucetTx.body?.messages;
    console.log('tx is: ', JSON.stringify(tx, null, 4));
    
  });
}
