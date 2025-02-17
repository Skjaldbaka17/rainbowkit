import {
  isAndroid
} from "./chunk-FJVNKOUD.js";
import {
  getWalletConnectConnector
} from "./chunk-3EC5YRTY.js";

// src/wallets/walletConnectors/metaMaskWallet/metaMaskWallet.ts
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
function isMetaMask(ethereum) {
  const isMetaMask2 = !!(ethereum == null ? void 0 : ethereum.isMetaMask);
  if (!isMetaMask2)
    return false;
  if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state)
    return false;
  if (ethereum.isApexWallet)
    return false;
  if (ethereum.isAvalanche)
    return false;
  if (ethereum.isKuCoinWallet)
    return false;
  if (ethereum.isPortal)
    return false;
  if (ethereum.isTokenPocket)
    return false;
  if (ethereum.isTokenary)
    return false;
  return true;
}
var metaMaskWallet = ({
  chains,
  ...options
}) => {
  const isMetaMaskInjected = typeof window !== "undefined" && typeof window.ethereum !== "undefined" && isMetaMask(window.ethereum);
  const shouldUseWalletConnect = !isMetaMaskInjected;
  return {
    id: "metaMask",
    name: "MetaMask",
    iconUrl: async () => (await import("./metaMaskWallet-F3BDZH5W.js")).default,
    iconAccent: "#f6851a",
    iconBackground: "#fff",
    installed: !shouldUseWalletConnect ? isMetaMaskInjected : void 0,
    downloadUrls: {
      browserExtension: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
      android: "https://play.google.com/store/apps/details?id=io.metamask",
      ios: "https://apps.apple.com/us/app/metamask/id1438144202",
      qrCode: "https://metamask.io/download/"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({ chains }) : new MetaMaskConnector({
        chains,
        options
      });
      const getUri = async () => {
        const { uri } = (await connector.getProvider()).connector;
        return isAndroid() ? uri : `https://metamask.app.link/wc?uri=${encodeURIComponent(uri)}`;
      };
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://metamask.io/faqs/",
            steps: [
              {
                description: "We recommend putting MetaMask on your home screen for quicker access.",
                step: "install",
                title: "Open the MetaMask app"
              },
              {
                description: "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "After you scan, a connection prompt will appear for you to connect your wallet.",
                step: "scan",
                title: "Tap the scan button"
              }
            ]
          }
        } : void 0,
        extension: {
          learnMoreUrl: "https://metamask.io/faqs/",
          instructions: {
            steps: [
              {
                description: "We recommend pinning MetaMask to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the MetaMask extension"
              },
              {
                description: "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "Once you set up your wallet, click below to refresh the browser and load up the extension.",
                step: "refresh",
                title: "Refresh your browser"
              }
            ]
          }
        }
      };
    }
  };
};

export {
  metaMaskWallet
};
