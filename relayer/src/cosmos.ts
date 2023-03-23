import {
  DirectSecp256k1HdWallet,
  makeCosmoshubPath,
  SigningCosmWasmClient,
} from "cosmwasm";
import { GasPrice } from "@cosmjs/stargate";
import dotenv from "dotenv";

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
}
