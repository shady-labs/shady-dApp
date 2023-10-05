import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  walletConnect,
  safeWallet,
  localWallet,
  magicLink,
  rainbowWallet,
  phantomWallet,
  darkTheme,
} from "@thirdweb-dev/react";

function WalletButton() {
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId="efbbe4578d777c8bd2cc4dfbc9195faf"
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        walletConnect(),
        safeWallet({
          personalWallets: [
            metamaskWallet(),
            walletConnect(),
          ],
        }),
        localWallet(),
        magicLink({
          apiKey: import.meta.env.VITE_MAGIC_LINK_KEY,
          oauthOptions: {
            providers: [
              "google",
              "facebook",
              "twitter",
              "apple",
            ],
          },
        }),
        rainbowWallet(),
        phantomWallet(),
      ]}
    >
      <ConnectWallet
        theme={darkTheme({
          accentText: "#8e05c2",
          modalBg: "#131418",
          dropdownBg: "#131418",
          borderColor: "#22232b",
          separatorLine: "#22232b",
          accentButtonBg: "#8e05c2",
        })}
        btnTitle={"Sign In"}
        modalTitle={"Shady Labs"}
        switchToActiveChain={true}
        modalSize={"wide"}
        welcomeScreen={{
          title:
            "Sign in to explore the shady labs",
          img: {
            src: "https://shadylabs.xyz/logo.svg",
            width: 150,
            height: 150,
          },
        }}
        modalTitleIconUrl={
          "https://shadylabs.xyz/logo.svg"
        }
      />
    </ThirdwebProvider>
  );
}

export default WalletButton;