import {
  isAndroid
} from "./chunk-FJVNKOUD.js";
import {
  getWalletConnectConnector
} from "./chunk-3EC5YRTY.js";

// src/wallets/walletConnectors/argentWallet/argentWallet.ts
var argentWallet = ({ chains }) => ({
  id: "argent",
  name: "Argent",
  iconUrl: async () => (await import("./argentWallet-343I4Q2C.js")).default,
  iconBackground: "#fff",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=im.argent.contractwalletclient",
    ios: "https://apps.apple.com/us/app/argent/id1358741926",
    qrCode: "https://argent.link/app"
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ chains });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return isAndroid() ? uri : `https://argent.link/app/wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: "https://www.argent.xyz/learn/what-is-a-crypto-wallet/",
          steps: [
            {
              description: "Put Argent on your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the Argent app"
            },
            {
              description: "Create a wallet and username, or import an existing wallet.",
              step: "create",
              title: "Create or Import a Wallet"
            },
            {
              description: "After you scan, a connection prompt will appear for you to connect your wallet.",
              step: "scan",
              title: "Tap the Scan QR button"
            }
          ]
        }
      }
    };
  }
});

export {
  argentWallet
};
