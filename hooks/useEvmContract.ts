import { useMemo } from "react";
import { utils } from "signet.js";
import { usePublicClient, useWalletClient } from "wagmi";

export const useEvmContract = () => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const chainSigContract = useMemo(() => {
    if (!publicClient || !walletClient) {
      return undefined;
    }

    return new utils.chains.evm.ChainSignatureContract({
      publicClient,
      walletClient: walletClient,
      contractAddress: utils.constants.CONTRACT_ADDRESSES.ETHEREUM.TESTNET_DEV,
    });
  }, [publicClient, walletClient]);

  return { chainSigContract };
};
