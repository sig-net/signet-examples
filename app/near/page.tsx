"use client";
import { useChains } from "@/hooks/useChains";
import useNearContract from "@/hooks/useNearContract";
import {
  signBtcTransaction,
  signCosmosTransaction,
  signEvmSignMessage,
  signEvmSignTypedData,
  signEvmTransaction,
} from "@/lib/signMethods";
import useInitNear from "./_hooks/useInitNear";

const NearPage = () => {
  const { chainSigContract } = useNearContract();
  const { account } = useInitNear();
  const chains = useChains({ contract: chainSigContract });

  if (!chainSigContract || !chains || !account) return null;

  const handleEvmTransaction = async () => {
    await signEvmTransaction({
      chainSigContract: chainSigContract,
      evm: chains.evm,
      predecessorId: account.accountId,
    });
  };

  const handleEvmSignMessage = async () => {
    await signEvmSignMessage({
      chainSigContract: chainSigContract,
      evm: chains.evm,
      predecessorId: account.accountId,
    });
  };

  const handleEvmSignTypedData = async () => {
    await signEvmSignTypedData({
      chainSigContract: chainSigContract,
      evm: chains.evm,
      predecessorId: account.accountId,
    });
  };

  const handleBtcTransaction = async () => {
    await signBtcTransaction({
      chainSigContract: chainSigContract,
      btc: chains.btc,
      predecessorId: account.accountId,
    });
  };

  const handleOsmosisTransaction = async () => {
    await signCosmosTransaction({
      chainSigContract: chainSigContract,
      cosmos: chains.cosmos,
      predecessorId: account.accountId,
    });
  };

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

export default NearPage;
