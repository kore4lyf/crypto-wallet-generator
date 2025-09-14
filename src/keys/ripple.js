import { generateSeed, deriveKeypair, deriveAddress } from "ripple-keypairs";
import { mnemonicToSeedSync } from "bip39";

export function generateRippleKeys(mnemonic, count = 1) {
  const wallets = [];
  
  for (let i = 0; i < count; i++) {
    const seed = generateSeed({ entropy: mnemonicToSeedSync(`${mnemonic} ${i}`) });
    const keypair = deriveKeypair(seed);
    const privateKey = keypair.privateKey;
    const address = deriveAddress(keypair.publicKey);
    
    wallets.push({
      index: i,
      privateKey,
      address,
    });
  }
  
  return count === 1 ? wallets[0] : wallets;
}
