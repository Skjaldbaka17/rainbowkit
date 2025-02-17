import {
  darkTheme
} from "./chunk-FRF2GUPO.js";
import {
  midnightTheme
} from "./chunk-O2CXI27D.js";
import {
  ConnectButton,
  DesktopOptions,
  MobileOptions,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  createAuthenticationAdapter,
  cssObjectFromTheme,
  cssStringFromTheme,
  dialogContent,
  dialogContentMobile,
  isAndroid,
  isHexString,
  isIOS,
  isMobile,
  useAccountModal,
  useChainId,
  useChainModal,
  useConnectModal,
  useTransactionStore
} from "./chunk-DLCHE6EK.js";
import {
  lightTheme
} from "./chunk-ATKR4544.js";
import "./chunk-4QPBWJI3.js";

// src/wallets/connectorsForWallets.ts
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";

// src/utils/omitUndefinedValues.ts
function omitUndefinedValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_key, value]) => value !== void 0)
  );
}

// src/wallets/connectorsForWallets.ts
var connectorsForWallets = (walletList) => {
  return () => {
    let index = -1;
    const connectors = [];
    const visibleWallets = [];
    const potentiallyHiddenWallets = [];
    const walletInstances = [];
    walletList.forEach(({ groupName, wallets }, groupIndex) => {
      wallets.forEach((wallet) => {
        index++;
        if ((wallet == null ? void 0 : wallet.iconAccent) && !isHexString(wallet == null ? void 0 : wallet.iconAccent)) {
          throw new Error(
            `Property \`iconAccent\` is not a hex value for wallet: ${wallet.name}`
          );
        }
        const walletListItem = {
          ...wallet,
          groupIndex,
          groupName,
          index
        };
        if (typeof wallet.hidden === "function") {
          potentiallyHiddenWallets.push(walletListItem);
        } else {
          visibleWallets.push(walletListItem);
        }
      });
    });
    const walletListItems = [
      ...visibleWallets,
      ...potentiallyHiddenWallets
    ];
    walletListItems.forEach(
      ({
        createConnector: createConnector2,
        groupIndex,
        groupName,
        hidden,
        index: index2,
        ...walletMeta
      }) => {
        if (typeof hidden === "function") {
          const isHidden = hidden({
            wallets: [
              ...walletInstances.map(({ connector: connector2, id, installed, name }) => ({
                connector: connector2,
                id,
                installed,
                name
              }))
            ]
          });
          if (isHidden) {
            return;
          }
        }
        const { connector, ...connectionMethods } = omitUndefinedValues(
          createConnector2()
        );
        let walletConnectModalConnector;
        if (walletMeta.id === "walletConnect" && connectionMethods.qrCode && !isMobile()) {
          const { chains, options } = connector;
          walletConnectModalConnector = new WalletConnectLegacyConnector({
            chains,
            options: {
              ...options,
              qrcode: true
            }
          });
          connectors.push(walletConnectModalConnector);
        }
        const walletInstance = {
          connector,
          groupIndex,
          groupName,
          index: index2,
          walletConnectModalConnector,
          ...walletMeta,
          ...connectionMethods
        };
        walletInstances.push(walletInstance);
        if (!connectors.includes(connector)) {
          connectors.push(connector);
          connector._wallets = [];
        }
        connector._wallets.push(walletInstance);
      }
    );
    return connectors;
  };
};

// src/wallets/walletConnectors/braveWallet/braveWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
var braveWallet = ({
  chains,
  ...options
}) => {
  var _a;
  return {
    id: "brave",
    name: "Brave Wallet",
    iconUrl: async () => (await import("./braveWallet-VWIUQB2U.js")).default,
    iconBackground: "#fff",
    installed: typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.isBraveWallet) === true,
    downloadUrls: {},
    createConnector: () => ({
      connector: new InjectedConnector({
        chains,
        options
      })
    })
  };
};

// src/wallets/walletConnectors/coinbaseWallet/coinbaseWallet.ts
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
var coinbaseWallet = ({
  appName,
  chains,
  ...options
}) => {
  var _a;
  const isCoinbaseWalletInjected = typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.isCoinbaseWallet) === true;
  return {
    id: "coinbase",
    name: "Coinbase Wallet",
    shortName: "Coinbase",
    iconUrl: async () => (await import("./coinbaseWallet-VVDQG4AO.js")).default,
    iconAccent: "#2c5ff6",
    iconBackground: "#2c5ff6",
    installed: isCoinbaseWalletInjected || void 0,
    downloadUrls: {
      browserExtension: "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad",
      android: "https://play.google.com/store/apps/details?id=org.toshi",
      ios: "https://apps.apple.com/us/app/coinbase-wallet-store-crypto/id1278383455",
      qrCode: "https://coinbase-wallet.onelink.me/q5Sx/fdb9b250"
    },
    createConnector: () => {
      const ios = isIOS();
      const connector = new CoinbaseWalletConnector({
        chains,
        options: {
          appName,
          headlessMode: true,
          ...options
        }
      });
      const getUri = async () => (await connector.getProvider()).qrUrl;
      return {
        connector,
        ...ios ? {} : {
          qrCode: {
            getUri,
            instructions: {
              learnMoreUrl: "https://www.coinbase.com/learn/tips-and-tutorials/how-to-set-up-a-crypto-wallet",
              steps: [
                {
                  description: "We recommend putting Coinbase Wallet on your home screen for quicker access.",
                  step: "install",
                  title: "Open the Coinbase Wallet app"
                },
                {
                  description: "You can easily backup your wallet using the cloud backup feature.",
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
          },
          extension: {
            instructions: {
              steps: [
                {
                  description: "We recommend pinning Coinbase Wallet to your taskbar for quicker access to your wallet.",
                  step: "install",
                  title: "Install the Coinbase Wallet extension"
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
        }
      };
    }
  };
};

// src/wallets/walletConnectors/injectedWallet/injectedWallet.ts
import { InjectedConnector as InjectedConnector2 } from "wagmi/connectors/injected";
var injectedWallet = ({
  chains,
  ...options
}) => ({
  id: "injected",
  name: "Browser Wallet",
  iconUrl: async () => (await import("./injectedWallet-UM67Z7WG.js")).default,
  iconBackground: "#fff",
  hidden: ({ wallets }) => wallets.some(
    (wallet) => wallet.installed && wallet.name === wallet.connector.name && (wallet.connector instanceof InjectedConnector2 || wallet.id === "coinbase")
  ),
  createConnector: () => ({
    connector: new InjectedConnector2({
      chains,
      options
    })
  })
});

// src/wallets/walletConnectors/metaMaskWallet/metaMaskWallet.ts
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

// src/wallets/getWalletConnectConnector.ts
import { WalletConnectLegacyConnector as WalletConnectLegacyConnector2 } from "wagmi/connectors/walletConnectLegacy";
var sharedConnectors = /* @__PURE__ */ new Map();
function createConnector(options) {
  const connector = new WalletConnectLegacyConnector2(options);
  sharedConnectors.set(JSON.stringify(options), connector);
  return connector;
}
function getWalletConnectConnector({
  chains,
  qrcode = false
}) {
  const options = {
    chains,
    options: {
      qrcode
    }
  };
  const serializedOptions = JSON.stringify(options);
  const sharedConnector = sharedConnectors.get(serializedOptions);
  return sharedConnector != null ? sharedConnector : createConnector(options);
}

// src/wallets/walletConnectors/metaMaskWallet/metaMaskWallet.ts
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

// src/wallets/walletConnectors/rainbowWallet/rainbowWallet.ts
import { InjectedConnector as InjectedConnector3 } from "wagmi/connectors/injected";
function isRainbow(ethereum) {
  const isRainbow2 = Boolean(ethereum.isRainbow);
  if (!isRainbow2) {
    return false;
  }
  return true;
}
var rainbowWallet = ({
  chains,
  ...options
}) => {
  const isRainbowInjected = typeof window !== "undefined" && typeof window.ethereum !== "undefined" && isRainbow(window.ethereum);
  const shouldUseWalletConnect = !isRainbowInjected;
  return {
    id: "rainbow",
    name: "Rainbow",
    iconUrl: async () => (await import("./rainbowWallet-KSMGN6MJ.js")).default,
    iconBackground: "#0c2f78",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=me.rainbow",
      ios: "https://apps.apple.com/us/app/rainbow-ethereum-wallet/id1457119021",
      qrCode: "https://rainbow.download"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({ chains }) : new InjectedConnector3({
        chains,
        options
      });
      const getUri = async () => {
        const { uri } = (await connector.getProvider()).connector;
        return isAndroid() ? uri : `https://rnbwapp.com/wc?uri=${encodeURIComponent(uri)}`;
      };
      return {
        connector,
        mobile: { getUri: shouldUseWalletConnect ? getUri : void 0 },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://learn.rainbow.me/connect-your-wallet-to-a-website-or-app",
            steps: [
              {
                description: "We recommend putting Rainbow on your home screen for faster access to your wallet.",
                step: "install",
                title: "Open the Rainbow app"
              },
              {
                description: "You can easily backup your wallet using our backup feature on your phone.",
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
        } : void 0
      };
    }
  };
};

// src/wallets/walletConnectors/walletConnectWallet/walletConnectWallet.ts
var walletConnectWallet = ({
  chains
}) => ({
  id: "walletConnect",
  name: "WalletConnect",
  iconUrl: async () => (await import("./walletConnectWallet-GTSESN7Q.js")).default,
  iconBackground: "#3b99fc",
  createConnector: () => {
    const ios = isIOS();
    const connector = getWalletConnectConnector({
      chains,
      qrcode: ios
    });
    const getUri = async () => (await connector.getProvider()).connector.uri;
    return {
      connector,
      ...ios ? {} : {
        mobile: { getUri },
        qrCode: { getUri }
      }
    };
  }
});

// src/wallets/getDefaultWallets.ts
var getDefaultWallets = ({
  appName,
  chains
}) => {
  const wallets = [
    {
      groupName: "Popular",
      wallets: [
        injectedWallet({ chains }),
        rainbowWallet({ chains }),
        coinbaseWallet({ appName, chains }),
        metaMaskWallet({ chains }),
        walletConnectWallet({ chains }),
        braveWallet({ chains })
      ]
    }
  ];
  return {
    connectors: connectorsForWallets(wallets),
    wallets
  };
};

// src/transactions/useAddRecentTransaction.ts
import { useCallback } from "react";
import { useAccount } from "wagmi";
function useAddRecentTransaction() {
  const store = useTransactionStore();
  const { address } = useAccount();
  const chainId = useChainId();
  return useCallback(
    (transaction) => {
      if (!address || !chainId) {
        throw new Error("No address or chain ID found");
      }
      store.addTransaction(address, chainId, transaction);
    },
    [store, address, chainId]
  );
}

// src/__private__/index.ts
var __private__ = {
  DesktopOptions,
  dialogContent,
  dialogContentMobile,
  MobileOptions
};
export {
  ConnectButton,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  __private__,
  connectorsForWallets,
  createAuthenticationAdapter,
  cssObjectFromTheme,
  cssStringFromTheme,
  darkTheme,
  getDefaultWallets,
  getWalletConnectConnector,
  lightTheme,
  midnightTheme,
  useAccountModal,
  useAddRecentTransaction,
  useChainModal,
  useConnectModal
};
