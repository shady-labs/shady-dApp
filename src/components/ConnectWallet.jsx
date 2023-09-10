import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';
import { getDefaultWallets, RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit';
import { publicProvider } from 'wagmi/providers/public';
import WalletButton from "./WalletButton";
import '@rainbow-me/rainbowkit/styles.css';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  projectId: 'b0b616a37e00ebb046979c68c3dfce87',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function ConnectWallet() {
  return (
    <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider 
          theme={midnightTheme({
            overlayBlur: 'large',
            accentColor: '#c147e9',
          })}   
          /* modalSize="compact" */
          chains={chains}>
          <WalletButton />
        </RainbowKitProvider>
      </WagmiConfig>
  )
}

export default ConnectWallet;