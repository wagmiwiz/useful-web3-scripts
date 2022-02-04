### Various web3 scripts


#### For all scripts

1. Clone the repo
2. Run `yarn install` (tested with node v16.10)
3. Create a `.env` file (some scripts may need some env vars)
4. Run with `ts-node src/<some-script>.ts`

#### For merkle trees

1. Put list of addresses as a json array of strings in `/data/allowlist_addresses.json`
2. Run `ts-node src/generateMerkleProofs.ts`
