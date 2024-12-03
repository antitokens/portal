import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import VoteOption from "../components/VoteOption";
import { ANTI_TOKEN_MINT, PRO_TOKEN_MINT } from "../utils/solana";
import "@solana/wallet-adapter-react-ui/styles.css";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-3xl font-bold">Vote with Your Solana Wallet</h1>
      <WalletMultiButton className="wallet-button" />
      <VoteSection />
    </div>
  );
};

const VoteSection = () => {
  const { connected, publicKey } = useWallet();

  if (!connected) {
    return <p>Please connect your wallet to vote</p>;
  }

  return (
    <div className="space-y-4">
      <p>Connected wallet: {publicKey.toString()}</p>
      <VoteOption wallet={publicKey} option="A" mint={ANTI_TOKEN_MINT} />
      <VoteOption wallet={publicKey} option="B" mint={PRO_TOKEN_MINT} />
    </div>
  );
};

const App = () => {
  const endpoint = clusterApiUrl("mainnet-beta");

  // Configure supported wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Home />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
