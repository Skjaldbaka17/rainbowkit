import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
export declare function getWalletConnectConnector({ chains, qrcode, }: {
    chains: Chain[];
    qrcode?: boolean;
}): WalletConnectLegacyConnector;
