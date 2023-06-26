import '@/styles/globals.css'
import "@rainbow-me/rainbowkit/styles.css";


import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains([polygon], [publicProvider()]);
import { configureChains, createConfig, WagmiConfig } from "wagmi";

const { connectors } = getDefaultWallets({
  appName: "chat-app",
  projectId: "36c9d02bee37acf653f7e9e8b4bcf323",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }) {
  
    return (
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    );
  
  // return <Component {...pageProps} />
}
