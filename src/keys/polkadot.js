import {
  mnemonicToMiniSecret,
  cryptoWaitReady,
  encodeAddress,
} from "@polkadot/util-crypto";
import { sr25519PairFromSeed } from "@polkadot/util-crypto/sr25519";

export async function generatePolkadotKeys(mnemonic, count = 1) {
  await cryptoWaitReady();
  const wallets = [];
  
  for (let i = 0; i < count; i++) {
    const seed = mnemonicToMiniSecret(`${mnemonic}//${i}`);
    const keyPair = sr25519PairFromSeed(seed);
    const privateKey = Buffer.from(keyPair.secretKey).toString("hex");
    const address = encodeAddress(keyPair.publicKey, 0);
    
    wallets.push({
      index: i,
      privateKey,
      address,
    });
  }
  
  return count === 1 ? wallets[0] : wallets;
}
