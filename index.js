import { generateChainKeys } from "./src/generateAllKeys.js";
import { generateMnemonic } from "bip39";
import readline from "readline";
import fs from "fs";
import path from "path";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const chains = ['bitcoin', 'litecoin', 'dogecoin', 'evm', 'solana', 'polkadot', 'ripple'];

// Create My Wallets folder if it doesn't exist
const walletsDir = "./My Wallets";
if (!fs.existsSync(walletsDir)) {
  fs.mkdirSync(walletsDir);
}

console.log("Crypto Keys Generator");
console.log("Select chain:");
chains.forEach((chain, index) => {
  console.log(`${index + 1}. ${chain.toUpperCase()}`);
});

rl.question("Choose chain (1-7): ", (chainChoice) => {
  const selectedChain = chains[parseInt(chainChoice) - 1];
  if (!selectedChain) {
    console.log("Invalid choice");
    rl.close();
    return;
  }
  
  rl.question("Use custom seed phrase? (y/n): ", (useCustom) => {
    if (useCustom.toLowerCase() === 'y') {
      rl.question("Enter your 12-word seed phrase: ", (customSeed) => {
        askSubwalletCount(selectedChain, customSeed.trim());
      });
    } else {
      askSubwalletCount(selectedChain);
    }
  });
});

function askSubwalletCount(chain, mnemonic = null) {
  rl.question("Number of subwallets to generate: ", (count) => {
    const walletCount = parseInt(count);
    if (walletCount < 1 || isNaN(walletCount)) {
      console.log("Invalid count. Using 1.");
      generateChainWallets(chain, mnemonic, 1);
    } else {
      generateChainWallets(chain, mnemonic, walletCount);
    }
    rl.close();
  });
}

async function generateChainWallets(chain, mnemonic = null, count = 1) {
  try {
    const seedPhrase = mnemonic || generateMnemonic(128);
    const keys = await generateChainKeys(chain, seedPhrase, count);
    
    const result = {
      mnemonic: seedPhrase,
      chain: chain.toUpperCase(),
      wallets: keys
    };
    
    console.log(result);
    saveWallet(result);
  } catch (error) {
    console.error("Error generating keys:", error);
  }
}

function saveWallet(walletData) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${walletData.chain}_${timestamp}.txt`;
  const filepath = path.join(walletsDir, filename);
  
  let content = `Chain: ${walletData.chain}\n`;
  content += `Mnemonic: ${walletData.mnemonic}\n`;
  content += `Generated: ${new Date().toISOString()}\n\n`;
  
  if (Array.isArray(walletData.wallets)) {
    walletData.wallets.forEach((wallet, index) => {
      content += `Wallet ${index + 1}:\n`;
      content += `  Address: ${wallet.address}\n`;
      content += `  Private Key: ${wallet.privateKey}\n\n`;
    });
  } else {
    content += `Wallet:\n`;
    content += `  Address: ${walletData.wallets.address}\n`;
    content += `  Private Key: ${walletData.wallets.privateKey}\n`;
  }
  
  fs.writeFileSync(filepath, content);
  console.log(`\nWallet saved to: ${filepath}`);
}
