import { generateBitcoinKeys } from "./keys/bitcoin.js";
import { generateLitecoinKeys } from "./keys/litecoin.js";
import { generateDogecoinKeys } from "./keys/dogecoin.js";
import { generateEVMKeys } from "./keys/evm.js";
import { generateSolanaKeys } from "./keys/solana.js";
import { generatePolkadotKeys } from "./keys/polkadot.js";
import { generateRippleKeys } from "./keys/ripple.js";
import { generateMnemonic } from "bip39";

export async function generateAllKeys(customMnemonic = null) {
  const mnemonic = customMnemonic || generateMnemonic(128);
  return {
    mnemonic,
    bitcoin: generateBitcoinKeys(mnemonic),
    litecoin: generateLitecoinKeys(mnemonic),
    dogecoin: generateDogecoinKeys(mnemonic),
    evm: generateEVMKeys(mnemonic),
    solana: generateSolanaKeys(mnemonic),
    polkadot: await generatePolkadotKeys(mnemonic),
    ripple: generateRippleKeys(mnemonic),
  };
}

export async function generateChainKeys(chain, mnemonic, count = 1) {
  const generators = {
    bitcoin: generateBitcoinKeys,
    litecoin: generateLitecoinKeys,
    dogecoin: generateDogecoinKeys,
    evm: generateEVMKeys,
    solana: generateSolanaKeys,
    polkadot: generatePolkadotKeys,
    ripple: generateRippleKeys,
  };
  
  const generator = generators[chain];
  if (!generator) throw new Error(`Unsupported chain: ${chain}`);
  
  return chain === 'polkadot' ? await generator(mnemonic, count) : generator(mnemonic, count);
}
