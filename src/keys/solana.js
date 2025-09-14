import { Keypair, PublicKey } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";

export function generateSolanaKeys(mnemonic, count = 1) {
  const seed = mnemonicToSeedSync(mnemonic);
  const wallets = [];
  
  for (let i = 0; i < count; i++) {
    const path = `m/44'/501'/${i}'/0'`;
    const derivedSeed = derivePath(path, seed.toString('hex')).key;
    const keyPair = Keypair.fromSeed(derivedSeed);
    const privateKey = Buffer.from(keyPair.secretKey).toString("hex");
    const publicKey = new PublicKey(keyPair.publicKey);
    
    wallets.push({
      index: i,
      privateKey,
      address: publicKey.toString(),
    });
  }
  
  return count === 1 ? wallets[0] : wallets;
}
