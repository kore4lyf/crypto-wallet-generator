import { Mnemonic, HDNodeWallet } from "ethers";

export function generateEVMKeys(mnemonicPhrase, count = 1) {
  const mnemonic = Mnemonic.fromPhrase(mnemonicPhrase);
  const wallets = [];
  
  for (let i = 0; i < count; i++) {
    const wallet = HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${i}`);
    wallets.push({
      index: i,
      privateKey: wallet.privateKey,
      address: wallet.address,
    });
  }
  
  return count === 1 ? wallets[0] : wallets;
}
