"use client";

import { useChains } from "@/hooks/useChains";
import {
  signBtcTransaction,
  signCosmosTransaction,
  signEvmSignMessage,
  signEvmSignTypedData,
  signEvmTransaction,
} from "@/lib/signMethods";
import { useEvmContract } from "@/hooks/useEvmContract";
import { useWalletClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const EVMPage = () => {
  const { chainSigContract } = useEvmContract();
  const chains = useChains({ contract: chainSigContract });
  const { data: walletClient } = useWalletClient();

  if (!chainSigContract || !chains || !walletClient)
    return (
      <div className="flex flex-col items-center gap-6 p-8">
        <ConnectButton />
      </div>
    );

  const handleEvmTransaction = async () => {
    await signEvmTransaction({
      chainSigContract: chainSigContract,
      evm: chains.evm,
      predecessorId: walletClient.account.address,
    });
  };
  const handleEvmSignMessage = async () => {
    await signEvmSignMessage({
      chainSigContract: chainSigContract,
      evm: chains.evm,
      predecessorId: walletClient.account.address,
    });
  };

  const handleEvmSignTypedData = async () => {
    await signEvmSignTypedData({
      chainSigContract: chainSigContract,
      evm: chains.evm,
      predecessorId: walletClient.account.address,
    });
  };

  const handleBtcTransaction = async () => {
    await signBtcTransaction({
      chainSigContract: chainSigContract,
      btc: chains.btc,
      predecessorId: walletClient.account.address,
    });
  };

  const handleOsmosisTransaction = async () => {
    await signCosmosTransaction({
      chainSigContract: chainSigContract,
      cosmos: chains.cosmos,
      predecessorId: walletClient.account.address,
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <h1 className="text-3xl font-bold">EVM Cross-Chain Transactions</h1>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <button
          onClick={handleEvmTransaction}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Send EVM Transaction
        </button>
        <button
          onClick={handleEvmSignMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Sign EVM Message
        </button>
        <button
          onClick={handleEvmSignTypedData}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Sign EVM Typed Data
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

export default EVMPage;
