import { useMemo } from "react";
import { utils } from "signet.js";
import { useEnv } from "./useEnv";
import useInitNear from "@/app/near/_hooks/useInitNear";

export const useNearContract = () => {
  const { nearAccount, nearNetworkId, nearChainSignatureContract } = useEnv();
  const { account, keyPair } = useInitNear();

  const chainSigContract = useMemo(() => {
    if (!account) return undefined;

    return new utils.chains.near.ChainSignatureContract({
      networkId: nearNetworkId as "mainnet" | "testnet",
      contractId: nearChainSignatureContract,
      accountId: nearAccount,
      keypair: keyPair,
    });
  }, [
    account,
    keyPair,
    nearAccount,
    nearChainSignatureContract,
    nearNetworkId,
  ]);

  return { chainSigContract };
};

export default useNearContract;
