/**
 * ZecKit Devnet "Happy Path" Example
 * Read the local faucet balance, send 0.1 regtest ZEC to the faucet's own
 * unified address, and print the transaction ID returned by the faucet.
 */

const FAUCET_API = "http://127.0.0.1:8080";

async function runHappyPath() {
    console.log("==================================================");
    console.log("🔌 Connecting to ZecKit Devnet Faucet API...");
    console.log("==================================================\n");

    try {
        // 1. Check Faucet Status & Balance
        console.log("🔍 1. Checking Devnet Faucet Wallet Balance...");
        const statsResponse = await fetch(`${FAUCET_API}/stats`);

        if (!statsResponse.ok) {
            throw new Error(`Faucet API returned ${statsResponse.status}: Are you sure ZecKit Devnet is running?`);
        }
        const stats = await statsResponse.json();
        console.log(`✅ Success! Faucet has:`);
        console.log(`   - Transparent Balance: ${stats.transparent_balance} ZEC`);
        console.log(`   - Orchard Balance:    ${stats.orchard_balance} ZEC\n`);

        const addrResponse = await fetch(`${FAUCET_API}/address`);
        if (!addrResponse.ok) {
            throw new Error(`Faucet /address returned HTTP ${addrResponse.status}`);
        }
        const { unified_address } = await addrResponse.json();
        if (typeof unified_address !== 'string' || !unified_address.trim()) {
            throw new Error('Faucet /address returned no unified address');
        }

        console.log("📬 2. Receiver address identified");
        console.log(`   UA: ${unified_address.substring(0, 30)}...\n`);

        // 3. Send Funds
        console.log("💸 3. Initiating ZEC Transfer (Shielded)...");
        console.log("   Sending 0.1 ZEC to the address via Faucet...");

        const sendResponse = await fetch(`${FAUCET_API}/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                address: unified_address,
                amount: 0.1,
                memo: "Happy Path Example Test"
            })
        });

        if (!sendResponse.ok) {
            throw new Error(`Faucet /send returned HTTP ${sendResponse.status}`);
        }
        const sendResult = await sendResponse.json();
        if (typeof sendResult?.txid !== 'string' || !sendResult.txid.trim()) {
            throw new Error('Faucet /send returned no transaction ID');
        }

        console.log(`📜 TXID: ${sendResult.txid}`);
        if (sendResult.status) console.log(`   Status: ${sendResult.status}`);
        console.log("Faucet transfer request succeeded.");

    } catch (e) {
        console.error("\n❌ ERROR:", e.message);
        console.error("Make sure your ZecKit Devnet is running using `zeckit up`");
        process.exit(1);
    }
}

runHappyPath();
