import React from "react";
import { WalletProvider, useWallet } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import VoteOption from "../components/VoteOption";
import { ANTI_TOKEN_MINT, PRO_TOKEN_MINT } from "../utils/solana";

const Home = () => {
  const wallet = useWallet();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-3xl font-bold">Vote with Your Solana Wallet</h1>
      {wallet.connected ? (
        <div className="space-y-4">
          <VoteOption wallet={wallet} option="A" mint={ANTI_TOKEN_MINT} />
          <VoteOption wallet={wallet} option="B" mint={PRO_TOKEN_MINT} />
        </div>
      ) : (
        <p>Please connect your wallet to vote</p>
      )}
    </div>
  );
};

const App = () => (
  <WalletProvider>
    <WalletModalProvider>
      <Home />
    </WalletModalProvider>
  </WalletProvider>
);

export default App;
