import { ConnectButton } from '@rainbow-me/rainbowkit';

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