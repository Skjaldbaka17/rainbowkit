// src/wallets/walletConnectors/bitskiWallet/bitskiWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
var bitskiWallet = ({
  chains,
  ...options
}) => {
  var _a;
  return {
    id: "bitski",
    name: "Bitski",
    installed: typeof window !== "undefined" && typeof window.ethereum !== "undefined" && (window.ethereum.isBitski === true || !!((_a = window.ethereum.providers) == null ? void 0 : _a.find((p) => p.isBitski === true))),
    iconUrl: async () => (await import("./bitskiWallet-KMH3M3CM.js")).default,
    iconBackground: "#fff",
    downloadUrls: {
      browserExtension: "https://chrome.google.com/webstore/detail/bitski/feejiigddaafeojfddjjlmfkabimkell"
    },
    createConnector: () => ({
      connector: new InjectedConnector({
        chains,
        options
      })
    })
  };
};

export {
  bitskiWallet
};
