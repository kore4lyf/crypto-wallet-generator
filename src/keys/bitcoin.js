import { BIP32Factory } from "bip32";
import * as tinysecp from "tiny-secp256k1";
import { mnemonicToSeedSync } from "bip39";
import { payments } from "bitcoinjs-lib";

const bip32 = BIP32Factory(tinysecp);

export function generateBitcoinKeys(mnemonic, count = 1) {
  const seed = mnemonicToSeedSync(mnemonic);
  const node = bip32.fromSeed(seed);
  const wallets = [];
  
  for (let i = 0; i < count; i++) {
    const keyPair = node.derivePath(`m/44'/0'/0'/0/${i}`);
    const privateKey = keyPair.toWIF();
    const { address } = payments.p2pkh({ pubkey: keyPair.publicKey });
    
    wallets.push({
      index: i,
      privateKey,
      address,
    });
  }
  
  return count === 1 ? wallets[0] : wallets;
}
