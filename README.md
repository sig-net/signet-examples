# NEAR Chain Signature Examples

This repository demonstrates how to use ChainsSignatures using NEAR's and EVM contracts. The examples include:

- EVM:
  - Signing and broadcasting transactions
  - Signing and verifying messages
  - Signing and verifying typed data
- Cosmos:
  - Signing and broadcasting transactions
- Bitcoin:
  - Signing and broadcasting transactions

## Prerequisites

- Node.js
- pnpm
- A NEAR testnet account
- A Web3 wallet (like MetaMask) for EVM interactions

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sig-net/signet-examples.git
cd signet-examples
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

4. Fill in the required environment variables:

```
# General
NEXT_PUBLIC_SEPOLIA_INFURA_URL=       # Your Infura URL for Sepolia testnet

# EVM
NEXT_PUBLIC_RAINBOW_KIT_PROJECT_ID=   # Your RainbowKit project ID

# Near
NEXT_PUBLIC_NEAR_NETWORK_ID=          # e.g., testnet
NEXT_PUBLIC_NEAR_ACCOUNT=             # Your NEAR testnet account
NEXT_PUBLIC_NEAR_PRIVATE_KEY=         # Your NEAR account private key
NEXT_PUBLIC_NEAR_CHAIN_SIGNATURE_CONTRACT= # Chain signature contract address
```

## Running the Application

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Pages

The application consists of the following pages:

- **Home** (`/`): Landing page with links to NEAR and EVM demos
- **NEAR** (`/near`): Demonstrates NEAR transaction signing and verification
- **EVM** (`/evm`): Demonstrates EVM transaction signing, message signing, typed data signing, as well as Bitcoin and Cosmos transaction signing

## License

This project is licensed under the MIT License - see the LICENSE file for details.
