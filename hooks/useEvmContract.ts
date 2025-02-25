import { useMemo } from "react";
import { utils } from "signet.js";
import { usePublicClient, useWalletClient } from "wagmi";

const sepoliaContractAddress = "0x69C6b28Fdc74618817fa380De29a653060e14009";

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
      contractAddress: sepoliaContractAddress,
    });
  }, [publicClient, walletClient]);

  return { chainSigContract };
};
