import fs from "fs";
import keccak256 from "keccak256";

import { solidityKeccak256 } from "ethers/lib/utils";
import { MerkleTree } from "merkletreejs";

require("dotenv").config();


async function generateMerkleProofs() {
  const addresses:string[] = JSON.parse(fs.readFileSync("./data/allowlist_addresses.json", "utf8"));

  const elements = addresses.map((x: any) =>
    solidityKeccak256(["address"], [x])
  );

  const merkleTree = new MerkleTree(elements, keccak256, { sort: true });
  const root = merkleTree.getHexRoot();
  console.log(`1. Root to set in contract: ${root}`);

  // console.log(`Writing proofs to a file...`);
  let proofs = [];

  for (let i = 0; i < addresses.length; i++) {
    const leaf = elements[i];
    const proof = merkleTree.getHexProof(leaf);
    proofs.push({
      address: addresses[i],
      leaf: leaf,
      proof: proof,
    });
  }

  try {fs.mkdirSync("./output");} catch(e:any) {}
  fs.writeFile("./output/proofs.json", JSON.stringify(proofs), function (err) {
    if (err) {
      return console.error(err);
    }
    console.log("2. Proofs written to file in output dir! Copy that file to your dapp to be used for sending to contract");
  });
}

generateMerkleProofs();
