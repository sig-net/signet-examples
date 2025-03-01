"use client";

import { useEffect, useState } from "react";
import { useChains } from "@/hooks/useChains";
import {
  signBtcTransaction,
  signCosmosTransaction,
  signEvmSignMessage,
  signEvmSignTypedData,
  signEvmTransaction,
} from "@/lib/signMethods";
import { useEvmContract } from "@/hooks/useEvmContract";
import useNearContract from "@/hooks/useNearContract";
import useInitNear from "@/hooks/useInitNear";
import { useWalletClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "near";
  const isNearMode = mode === "near";

  // EVM related hooks
  const { chainSigContract: evmContract } = useEvmContract();
  const { data: walletClient } = useWalletClient();

  // NEAR related hooks
  const { chainSigContract: nearContract } = useNearContract();
  const { account } = useInitNear();

  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  const [contract, setContract] = useState<any>(null);
  const [chains, setChains] = useState<any>(null);
  const [predecessorId, setPredecessorId] = useState<string>("");

  useEffect(() => {
    if (isNearMode) {
      if (nearContract && account) {
        setContract(nearContract);
        const chainsData = useChains({ contract: nearContract });
        if (chainsData) {
          setChains(chainsData);
          setPredecessorId(account.accountId);
          setIsLoading(false);
        }
      }
    } else {
      if (evmContract && walletClient) {
        setContract(evmContract);
        const chainsData = useChains({ contract: evmContract });
        if (chainsData) {
          setChains(chainsData);
          setPredecessorId(walletClient.account.address);
          setIsLoading(false);
        }
      }
    }
  }, [isNearMode, nearContract, evmContract, account, walletClient]);

  if (isLoading || !contract || !chains) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Loading...</CardTitle>
              <CardDescription>
                {isNearMode
                  ? "Connecting to NEAR network"
                  : "Please connect your wallet to continue"}
              </CardDescription>
            </CardHeader>
            {!isNearMode && (
              <CardFooter className="flex justify-center">
                <ConnectButton />
              </CardFooter>
            )}
          </Card>
        </main>
      </div>
    );
  }

  const handleEvmTransaction = async () => {
    if (!contract || !chains || !chains.evm) return;

    await signEvmTransaction({
      chainSigContract: contract,
      evm: chains.evm,
      predecessorId,
    });
  };

  const handleEvmSignMessage = async () => {
    if (!contract || !chains || !chains.evm) return;

    await signEvmSignMessage({
      chainSigContract: contract,
      evm: chains.evm,
      predecessorId,
    });
  };

  const handleEvmSignTypedData = async () => {
    if (!contract || !chains || !chains.evm) return;

    await signEvmSignTypedData({
      chainSigContract: contract,
      evm: chains.evm,
      predecessorId,
    });
  };

  const handleBtcTransaction = async () => {
    if (!contract || !chains || !chains.btc) return;

    await signBtcTransaction({
      chainSigContract: contract,
      btc: chains.btc,
      predecessorId,
    });
  };

  const handleOsmosisTransaction = async () => {
    if (!contract || !chains || !chains.cosmos) return;

    await signCosmosTransaction({
      chainSigContract: contract,
      cosmos: chains.cosmos,
      predecessorId,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center p-8 gap-8">
        <Card className="w-full max-w-3xl">
          <CardHeader className="text-center">
            <CardTitle>
              {isNearMode ? "NEAR" : "EVM"} Cross-Chain Transactions
            </CardTitle>
            <CardDescription>
              Sign and verify transactions across multiple blockchains
              {isNearMode ? " using NEAR" : ""}
            </CardDescription>
            {isNearMode && account && (
              <div className="mt-4 text-sm text-muted-foreground border rounded-md p-2 bg-muted/50 max-w-md mx-auto">
                Connected as:{" "}
                <span className="font-mono">{account.accountId}</span>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Ethereum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={handleEvmTransaction}
                    variant="outline"
                    className="h-16 border-2"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <span>Send EVM Transaction</span>
                    </div>
                  </Button>
                  <Button
                    onClick={handleEvmSignMessage}
                    variant="outline"
                    className="h-16 border-2"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <span>Sign EVM Message</span>
                    </div>
                  </Button>
                  <Button
                    onClick={handleEvmSignTypedData}
                    variant="outline"
                    className="h-16 border-2 col-span-full"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <span>Sign EVM Typed Data</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Bitcoin</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handleBtcTransaction}
                    variant="outline"
                    className="w-full h-16 border-2"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <span>Send BTC Transaction</span>
                    </div>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Cosmos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handleOsmosisTransaction}
                    variant="outline"
                    className="w-full h-16 border-2"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <span>Send Osmosis Transaction</span>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>

          {!isNearMode && (
            <CardFooter className="flex justify-center">
              <ConnectButton />
            </CardFooter>
          )}
        </Card>
      </main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <div className="container">
          <p>NEAR Chain Signature Examples &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
