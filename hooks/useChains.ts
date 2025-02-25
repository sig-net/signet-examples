import {
  ChainSignatureContract,
  EVM,
  Bitcoin,
  Cosmos,
  BTCRpcAdapters,
} from "signet.js";
import { useEnv } from "./useEnv";

export const useChains = ({
  contract,
}: {
  contract?: ChainSignatureContract;
}) => {
  const { sepoliaInfuraUrl } = useEnv();
  if (!contract) return null;

  return {
    evm: new EVM({
      rpcUrl: sepoliaInfuraUrl,
      contract: contract,
    }),

    btc: new Bitcoin({
      network: "testnet",
      btcRpcAdapter: new BTCRpcAdapters.Mempool(
        "https://mempool.space/testnet4/api"
      ),
      contract: contract,
    }),

    cosmos: new Cosmos({
      chainId: "osmo-test-5",
      contract: contract,
    }),
  };
};
