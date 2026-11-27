# ZecKit Example App

The sample reads the regtest faucet balance, gets the faucet’s own unified address, and requests a 0.1 ZEC transfer to that address. It prints the transaction ID returned by the faucet.

## Run the example

From the sample repository root, start the devnet using the sibling `../ZecKit` checkout.

```bash
cd ../ZecKit/cli
cargo run -- up --backend zaino
```

Once the faucet has spendable funds, open a second terminal at the sample repository root.

```bash
cd example-app
npm start
```

The sample calls `/stats`, `/address`, and `/send` on `http://127.0.0.1:8080`. A successful run prints `TXID` and exits with code 0. A failed request or a transfer response without a transaction ID exits with code 1. Confirmation on-chain requires a separate check.
