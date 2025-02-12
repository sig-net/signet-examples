"use client"

import { useMemo } from "react";
import useInitNear from "./_hooks/useInitNear";
import { utils, EVM, Bitcoin, Cosmos, BTCRpcAdapters } from 'signet.js'
import { useEnv } from "@/hooks/useEnv";

export const NearPage = () => {
    const { account, keyPair } = useInitNear();
    const { nearAccount, nearNetworkId, nearChainSignatureContract, sepoliaInfuraUrl } = useEnv();

    const chainSigContract = useMemo(() => {
        if (!account) return null;

        return new utils.chains.near.ChainSignatureContract({
            networkId: nearNetworkId as "mainnet" | "testnet",
            contractId: nearChainSignatureContract,
            accountId: nearAccount,
            keypair: keyPair,
        })

    }, [account, keyPair, nearAccount, nearChainSignatureContract, nearNetworkId])

    const handleEvmTransaction = async () => {
        if (!chainSigContract) return;

        const evm = new EVM({
            rpcUrl: sepoliaInfuraUrl,
            contract: chainSigContract,
        })

        const path = "eth"

        const { address: from } = await evm.deriveAddressAndPublicKey(nearAccount, path)

        const { transaction, mpcPayloads } = await evm.getMPCPayloadAndTransaction({
            from: from as `0x${string}`,
            to: "0x4174678c78fEaFd778c1ff319D5D326701449b25",
            value: 1n,
        })

        const rsvSignature = await chainSigContract?.sign({
            payload: mpcPayloads[0],
            path,
            key_version: 0,
        })

        if (!rsvSignature) {
            throw new Error("Failed to sign transaction")
        };

        const tx = evm.addSignature({
            transaction,
            mpcSignatures: [rsvSignature],
        })

        const txHash = await evm.broadcastTx(tx)

        console.log({ txHash })
    }

    const handleBtcTransaction = async () => {

        if (!chainSigContract) return null;

        const btcRpcAdapter = new BTCRpcAdapters.Mempool('https://mempool.space/testnet4/api')

        const btc = new Bitcoin({
            network: "testnet",
            btcRpcAdapter,
            contract: chainSigContract,
        })

        const path = "btc"

        const { publicKey, address: from } = await btc.deriveAddressAndPublicKey(nearAccount, path)

        console.log({ publicKey, from })

        const { transaction, mpcPayloads } = await btc.getMPCPayloadAndTransaction({
            publicKey,
            from,
            to: "tb1qjcgmg9ekeujzkdp4ep6a2lqvc5y50495uvp4u0",
            value: "1000",
        })

        const rsvSignature = await chainSigContract?.sign({
            payload: mpcPayloads[0],
            path,
            key_version: 0,
        })

        if (!rsvSignature) {
            throw new Error("Failed to sign transaction")
        };

        const tx = btc.addSignature({
            transaction,
            mpcSignatures: [rsvSignature],
        })

        const txHash = await btc.broadcastTx(tx)

        console.log({ txHash })
    }

    const handleOsmosisTransaction = async () => {
        if (!chainSigContract) return null;

        const osmosis = new Cosmos({
            chainId: "osmo-test-5",
            contract: chainSigContract,
        })

        const path = "osmo"

        const { address: from, publicKey } = await osmosis.deriveAddressAndPublicKey(nearAccount, path)

        const { transaction, mpcPayloads } = await osmosis.getMPCPayloadAndTransaction({
            address: from,
            publicKey,
            messages: [
                {
                    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                    value: {
                        fromAddress: from,
                        toAddress: "osmo1q5heryp07w6dflc3h4egdca6nmmekk0aqkj9gp",
                        amount: [{ denom: "uosmo", amount: "1000" }],
                    },
                },
            ],
            memo: "test",
        })

        const rsvSignature = await chainSigContract?.sign({
            payload: mpcPayloads[0],
            path,
            key_version: 0,
        })

        if (!rsvSignature) {
            throw new Error("Failed to sign transaction")
        };

        const tx = osmosis.addSignature({
            transaction,
            mpcSignatures: [rsvSignature],
        })

        const txHash = await osmosis.broadcastTx(tx)

        console.log({ txHash })
    }

    return (
        <div className="flex flex-col items-center gap-6 p-8">
            <h1 className="text-3xl font-bold">Near Cross-Chain Transactions</h1>
            <div className="flex flex-col gap-4 w-full max-w-md">
                <button
                    onClick={handleEvmTransaction}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                    Send EVM Transaction
                </button>
                <button
                    onClick={handleBtcTransaction}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                    Send BTC Transaction
                </button>
                <button
                    onClick={handleOsmosisTransaction}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                    Send Osmosis Transaction
                </button>
            </div>
        </div>
    );
};

export default NearPage;
