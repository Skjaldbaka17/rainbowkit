import type { MetaMaskConnectorOptions } from '@wagmi/core/dist/connectors/metaMask';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
export interface MetaMaskWalletOptions {
    chains: Chain[];
}
export declare const metaMaskWallet: ({ chains, ...options }: MetaMaskWalletOptions & MetaMaskConnectorOptions) => Wallet;
