import { Wallet } from "ethers";

const wallet = Wallet.createRandom();

console.log(`Address: ${wallet.address}`);
console.log(`Mnemonic: ${JSON.stringify(wallet.mnemonic)}`);
