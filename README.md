# Crypto Keys Generator

This project is a tool for generating private keys and addresses for multiple cryptocurrencies from a 12-word mnemonic seed phrase with support for multiple subwallets and automatic storage.

## Features

- Generates private keys and addresses for:
  - Bitcoin (BTC)
  - Litecoin (LTC)
  - Dogecoin (DOGE)
  - Ethereum-compatible networks (EVM)
  - Solana (SOL)
  - Polkadot (DOT)
  - Ripple (XRP)

- **Chain Selection**: Choose specific blockchain to generate wallets for
- **Multiple Subwallets**: Generate unlimited subwallets from a single seed phrase using HD derivation paths
- **Custom Seed Support**: Use your own 12-word mnemonic or generate a random one
- **Automatic Storage**: All generated wallets are saved to 'My Wallets' folder as txt files
- Modular design for easy extension and maintenance
- Written in modern JavaScript, compatible with a wide range of JavaScript environments and frameworks

## Installation

```bash
npm install
```

## Usage

To generate wallets:

```bash
npm start
```

The interactive CLI will guide you through:
1. **Chain Selection**: Choose from 7 supported blockchains
2. **Seed Phrase**: Use custom mnemonic or generate random one
3. **Subwallet Count**: Specify how many wallets to derive from the seed

## Wallet Storage

Generated wallets are automatically saved in the `My Wallets` folder with:
- Chain name and timestamp in filename
- Complete wallet information (mnemonic, addresses, private keys)
- Human-readable txt format

Example file: `EVM_2025-09-14T14-42-30-123Z.txt`

## HD Derivation Paths

- **Bitcoin**: `m/44'/0'/0'/0/{index}`
- **EVM**: `m/44'/60'/0'/0/{index}`
- **Solana**: `m/44'/501'/{index}'/0'`
- **Others**: Standard BIP44 paths

## Running Tests

```bash
npm test
```

## Project Structure

```bash
crypto-keys-generator/
│
├── src/
│   ├── keys/
│   │   ├── bitcoin.js
│   │   ├── litecoin.js
│   │   ├── dogecoin.js
│   │   ├── evm.js
│   │   ├── solana.js
│   │   ├── polkadot.js
│   │   └── ripple.js
│   └── generateAllKeys.js
│
├── tests/
│   ├── generateKeys.test.js
│   └── keys/
│       ├── bitcoin.test.js
│       ├── litecoin.test.js
│       ├── dogecoin.test.js
│       ├── evm.test.js
│       ├── solana.test.js
│       ├── polkadot.test.js
│       └── ripple.test.js
│
├── My Wallets/          # Auto-generated wallet storage
├── .gitignore
├── README.md
├── LICENSE
├── package.json
└── index.js
```

## License

MIT License

## Author

[Faleye Korede](https://github.com/kore4lyf)
