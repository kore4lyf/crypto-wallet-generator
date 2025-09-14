import { BIP32Factory } from "bip32";
import * as tinysecp from "tiny-secp256k1";
import { mnemonicToSeedSync } from "bip39";
import { payments } from "bitcoinjs-lib";

const litecoin = {
  messagePrefix: "\x19Litecoin Signed Message:\n",
  bech32: "ltc",
  bip32: {
    public: 0x019da462,
    private: 0x019d9cfe,
  },
  pubKeyHash: 0x30,
  scriptHash: 0x32,
  wif: 0xb0,
};

const bip32 = BIP32Factory(tinysecp);

export function generateLitecoinKeys(mnemonic, count = 1) {
  const seed = mnemonicToSeedSync(mnemonic);
  const node = bip32.fromSeed(seed, litecoin);
  const wallets = [];
  
  for (let i = 0; i < count; i++) {
    const keyPair = node.derivePath(`m/44'/2'/0'/0/${i}`);
    const privateKey = keyPair.toWIF();
    const { address } = payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: litecoin,
    });
    
    wallets.push({
      index: i,
      privateKey,
      address,
    });
  }
  
  return count === 1 ? wallets[0] : wallets;
}
