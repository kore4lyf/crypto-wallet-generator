import { BIP32Factory } from "bip32";
import * as tinysecp from "tiny-secp256k1";
import { mnemonicToSeedSync } from "bip39";
import { payments } from "bitcoinjs-lib";

const dogecoin = {
  messagePrefix: "\x19Dogecoin Signed Message:\n",
  bech32: "dc",
  bip32: {
    public: 0x02facafd,
    private: 0x02fac398,
  },
  pubKeyHash: 0x1e,
  scriptHash: 0x16,
  wif: 0x9e,
};

const bip32 = BIP32Factory(tinysecp);

export function generateDogecoinKeys(mnemonic, count = 1) {
  const seed = mnemonicToSeedSync(mnemonic);
  const node = bip32.fromSeed(seed, dogecoin);
  const wallets = [];
  
  for (let i = 0; i < count; i++) {
    const keyPair = node.derivePath(`m/44'/3'/0'/0/${i}`);
    const privateKey = keyPair.toWIF();
    const { address } = payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: dogecoin,
    });
    
    wallets.push({
      index: i,
      privateKey,
      address,
    });
  }
  
  return count === 1 ? wallets[0] : wallets;
}
