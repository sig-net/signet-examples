"use client"

import { useEnv } from "@/hooks/useEnv";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMemo } from "react";
import { utils } from "signet.js";
import { usePublicClient, useWalletClient } from "wagmi";

const sepoliaContractAddress = "0x6348104D80e1376b59789cA5b65f9a45708A16d6"

const EvmSign = () => {
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();

    const chainSignature = useMemo(() => {
        if (!publicClient || !walletClient) {
            return undefined;
        }

        return new utils.chains.evm.ChainSignatureContract({
            publicClient,
            walletClient: walletClient,
            contractAddress: sepoliaContractAddress
        });

    }, [publicClient, walletClient])

    if (!chainSignature) {
        return <div>No chain signature</div>
    }

    return (
        <div>
            <ConnectButton />
            <div className="flex flex-col gap-4">
                <button onClick={async () => {
                    const pubKey = await chainSignature?.getPublicKey();
                    console.log(pubKey);
                }}>Get Public Key</button>
                <button onClick={async () => {
                    const pubKey = await chainSignature?.getDerivedPublicKey({
                        path: "1",
                        predecessor: "0x0000000000000000000000000000000000000000"
                    });
                    console.log(pubKey);
                }}>Get Derived Public Key</button>
                <button onClick={async () => {
                    const pubKey = await chainSignature?.getLatestKeyVersion();
                    console.log(pubKey);
                }}>Get Latest Key Version</button>
                <button onClick={async () => {
                    const pubKey = await chainSignature?.sign({
                        payload: new Array(32).fill(2),
                        path: "1",
                        key_version: 0
                    });
                    console.log(pubKey);
                }}>Sign</button>
            </div>
        </div>
    )
}

export default EvmSign;