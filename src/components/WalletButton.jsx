import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  embeddedWallet,
  darkTheme,
  safeWallet,
  walletConnect,
  localWallet,
} from "@thirdweb-dev/react";

function WalletButton() {
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId="efbbe4578d777c8bd2cc4dfbc9195faf"
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        embeddedWallet(),
        safeWallet({
          personalWallets: [
            metamaskWallet(),
            walletConnect({ recommended: true }),
            localWallet(),
            embeddedWallet(),
          ],
        }),
      ]}
    >
      <ConnectWallet
        theme={darkTheme({
          fontFamily: "Manrope Variable, sans-serif",
          colors: {
            borderColor: "#000000",
            modalBg: "#000000",
            dropdownBg: "#000000",
            accentText: "#8E05C2",
            accentButtonBg: "#8E05C2",
            primaryButtonText: "#FFFFFF",
            primaryButtonBg: "#8E05C2 ",
          },
        })}
        accentButtonBg={"#8E05C2"}
        btnTitle={"Sign In"}
        modalTitle={"Shady Labs"}
        modalSize={"compact"}
        switchToActiveChain={true}
        hideTestnetFaucet={true}
        /* detailsBtn={() => {
          return <button> .... </button>;
        }} */
        welcomeScreen={{
          title: "Sign in to explore the shady labs",
          img: {
            src: "https://shadylabs.xyz/logo.svg",
            width: 150,
            height: 150,
          },
        }}
        modalTitleIconUrl={"https://shadylabs.xyz/logo.svg"}
      />
    </ThirdwebProvider>
  );
}

export default WalletButton;