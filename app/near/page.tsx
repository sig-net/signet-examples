"use client"

import { useMemo } from "react";
import useInitNear from "./_hooks/useInitNear";
import { utils, EVM } from 'signet.js'
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

    const evm = useMemo(() => {
        if (!chainSigContract) return null;

        return new EVM({
            rpcUrl: sepoliaInfuraUrl,
            contract: chainSigContract,
        })
    }, [chainSigContract, sepoliaInfuraUrl])

    const handleEvmTransaction = async () => {
        if (!evm) return;

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

    return (
        <div>
            <h1>Near</h1>
            <button onClick={handleEvmTransaction}>Send EVM Transaction</button>
        </div>
    );
};

export default NearPage;
