import { ConnectButton } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';
import { getDefaultWallets, RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit';
import { publicProvider } from 'wagmi/providers/public';
/* import WalletButton from "../components/ConnectWallet"; */

function WalletButton() {
  return (
    <div
      style={{
        display: 'flex',
        /* justifyContent: 'flex-end', */
        padding: 10,
      }}
    >
      <ConnectButton 
        chainStatus="none"
        showBalance={false}
      />
    </div>
  );
}

export default WalletButton;