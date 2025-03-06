import { chainAdapters, contracts } from "signet.js";
import { useEnv } from "./useEnv";

export const useChains = ({
  contract,
}: {
  contract?: contracts.ChainSignatureContract;
}) => {
  const { sepoliaInfuraUrl } = useEnv();
  if (!contract) return null;

  return {
    evm: new chainAdapters.evm.EVM({
      rpcUrl: sepoliaInfuraUrl,
      contract: contract,
    }),

    btc: new chainAdapters.btc.Bitcoin({
      network: "testnet",
      btcRpcAdapter: new chainAdapters.btc.BTCRpcAdapters.Mempool(
        "https://mempool.space/testnet4/api"
      ),
      contract: contract,
    }),

    cosmos: new chainAdapters.cosmos.Cosmos({
      chainId: "osmo-test-5",
      contract: contract,
    }),
  };
};
