"use client"

import { useEvmContract } from "@/hooks/useEvmContract";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const EvmSign = () => {
    const { chainSigContract } = useEvmContract();

    return (
        <div>
            <ConnectButton />
            <div className="flex flex-col gap-4">
                <button onClick={async () => {
                    const pubKey = await chainSigContract?.getPublicKey();
                    console.log(pubKey);
                }}>Get Public Key</button>
                <button onClick={async () => {
                    const pubKey = await chainSigContract?.getDerivedPublicKey({
                        path: "1",
                        predecessor: "0x0000000000000000000000000000000000000000"
                    });
                    console.log(pubKey);
                }}>Get Derived Public Key</button>
                <button onClick={async () => {
                    const pubKey = await chainSigContract?.getLatestKeyVersion();
                    console.log(pubKey);
                }}>Get Latest Key Version</button>
                <button onClick={async () => {
                    const pubKey = await chainSigContract?.sign({
                        payload: new Array(32).fill(Math.floor(Math.random() * 100)),
                        path: "test",
                        key_version: 0
                    });
                    console.log(pubKey);
                }}>Sign</button>
            </div>
        </div>
    )
}

export default EvmSign;