import React, { useMemo } from "react";
import Head from "next/head";
import Script from "next/script";
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
import Navbar from "../components/TopNavbar";
import Footer from "../components/BottomFooter";
import { ANTI_TOKEN_MINT, PRO_TOKEN_MINT } from "../utils/solana";
import "@solana/wallet-adapter-react-ui/styles.css";

const Home = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000";

  return (
    <>
      <Head>
        <title>Antitoken - Quantum-inspired Token Pair</title>
        <meta
          name="description"
          content="Experience the future of entangled token pair market making with $ANTI and $PRO tokens."
        />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Antitoken - Quantum-inspired Token Pair"
        />
        <meta
          property="og:description"
          content="Experience the future of entangled token pair market making with $ANTI and $PRO tokens."
        />
        <meta
          property="og:image"
          content={`${BASE_URL}/assets/antitoken_logo.jpeg`}
        />
        <meta property="og:url" content={`${BASE_URL}`} />
        <meta property="og:site_name" content="Antitoken" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Antitoken - Quantum-inspired Token Pair"
        />
        <meta
          name="twitter:description"
          content="Experience the future of entangled token pair market making with $ANTI and $PRO tokens."
        />
        <meta
          name="twitter:image"
          content={`${BASE_URL}/assets/antitoken_logo_large.webp`}
        />
        <meta name="twitter:site" content="@antitokens" />
        {/* Favicon and Icons */}
        <link
          rel="icon"
          type="image/png"
          href={`${BASE_URL}/assets/favicon/favicon-96x96.png`}
          sizes="96x96"
        />
        <link
          rel="shortcut icon"
          href={`${BASE_URL}/assets/favicon/favicon.ico`}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${BASE_URL}/assets/favicon/apple-touch-icon.png`}
        />
        <link
          rel="manifest"
          href={`${BASE_URL}/assets/favicon/site.webmanifest`}
        />
      </Head>
      <div className="bg-dark text-gray-100 min-h-screen relative overflow-x-hidden font-grotesk">
        <Stars />
        <Navbar />
        <LandingPage />
        <Footer />
      </div>
    </>
  );
};

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const Stars = () => {
  const seed = 42; // Fixed seed value
  return (
    <div className="fixed inset-0 pointer-events-none">
      {Array.from({ length: 16 }).map((_, idx) => {
        const randomTop = seededRandom(seed + idx) * 100;
        const randomLeft = seededRandom(seed * idx) * 100;
        const floatDuration = 8 + (idx % 6); // 8s to 14s
        return (
          <div
            key={idx}
            className={`star ${idx % 2 === 0 ? "star-red" : "star-green"}`}
            style={{
              top: `${randomTop}%`,
              left: `${randomLeft}%`,
              animation: `float ${floatDuration}s ease-in-out infinite`,
            }}
          ></div>
        );
      })}
    </div>
  );
};

const LandingPage = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "../..";
  const { connected, publicKey } = useWallet();

  return (
    <>
      <section className="min-h-screen pt-16 md:pt-20 flex flex-col items-center relative mt-10 mb-10">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[70%,30%] items-center gap-8 max-w-7xl mx-auto px-4">
          {/* Hero Text */}
          <div>
            <h1 className="tracking-tight text-4xl md:text-5xl lg:text-6xl mb-4 text-gray-300/90 font-semibold font-outfit">
              Vote with{" "}
              <span className="text-accent-primary font-semibold">$ANTI</span>{" "}
              and{" "}
              <span className="text-accent-secondary font-semibold">$PRO</span>{" "}
            </h1>
            <p className="font-open font-medium text-xl md:text-[1.35rem] text-gray-300 mb-6">
              Experience the future of prediction markets with Antitoken
            </p>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center relative">
            <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 blur-[50px]"></div>
            <img
              src={`${BASE_URL}/assets/antitoken_logo_large.webp`}
              alt="Antitoken Logo"
              className="w-72 h-72 rounded-full object-cover border-4 border-gray-800/50 relative z-10 transition-transform duration-200 ease-out"
            />
          </div>
        </div>

        {/* Voting Section */}
        <div className="text-center mt-10 w-full px-4">
          <h3 className="font-grotesk text-2xl font-medium text-gray-400 mb-6">
            Should Dev launch a token on Base?
          </h3>

          {/* Voting Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <VoteOption
              wallet={publicKey}
              option="YES with $PRO"
              mint={ANTI_TOKEN_MINT}
              disabled={!connected}
            />
            <VoteOption
              wallet={publicKey}
              option="NO with $ANTI"
              mint={PRO_TOKEN_MINT}
              disabled={!connected}
            />
          </div>

          {/* Connection Status */}
          <p
            className={`mt-4 text-sm ${
              connected ? "text-gray-300" : "text-red-500 animate-pulse"
            }`}
          >
            {connected
              ? "Choose your option"
              : "Connect your wallet to enable voting"}
          </p>
        </div>
        <div className="backdrop-blur-xl bg-dark-card/50 mt-20 p-12 rounded-2xl border border-gray-800 text-center">
          <h2 className="font-grotesk text-3xl font-bold mb-6 bg-gradient-to-r from-accent-primary from-20% to-accent-secondary to-90% bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the future of decentralised markets
          </p>
          <button className="bg-accent-primary hover:opacity-90 text-gray-300 px-8 py-3 rounded-lg text-lg font-semibold">
            Buy Tokens
          </button>
        </div>
      </section>
    </>
  );
};

const Features = () => (
  <section className="py-20">
    <h2 className="font-grotesk text-3xl font-bold text-center mb-12 bg-gradient-to-r from-accent-primary from-0% to-accent-secondary to-100% bg-clip-text text-transparent">
      Features
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: "Quantum-inspired Design",
          description:
            "Unique entangled token pair system based on quantum mechanical principles.",
        },
        {
          title: "Advanced Market Making",
          description:
            "Discretised AMM model with paired interaction mechanics.",
        },
        {
          title: "DeSci Integration",
          description:
            "Perfect for decentralised science funding and prediction markets.",
        },
      ].map((feature, idx) => (
        <div
          key={idx}
          className="p-6 md:p-8 backdrop-blur-xl bg-dark-card/50 rounded-2xl border border-gray-800/50 hover:border-accent-primary/20 transition-colors"
        >
          <h3 className="text-gray-300 text-xl font-bold mb-4">
            {feature.title}
          </h3>
          <p className="text-gray-400">{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="py-20">
    <h2 className="font-grotesk text-3xl font-bold text-center mb-12 bg-gradient-to-r from-accent-primary from-30% to-accent-secondary to-70% bg-clip-text text-transparent">
      How It Works
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          step: "01",
          title: "Token Interaction",
          description:
            "$ANTI and $PRO tokens interact through the Collider contract.",
        },
        {
          step: "02",
          title: "Emission Process",
          description:
            "Collider emits $BARYON and $PHOTON tokens based on quantum-like operations.",
        },
        {
          step: "03",
          title: "Market Dynamics",
          description:
            "Create prediction markets or fund DeSci projects with emitted tokens.",
        },
      ].map((work, idx) => (
        <div
          key={idx}
          className="backdrop-blur-xl bg-dark-card/50 p-6 md:p-8 rounded-2xl border border-gray-800/50 hover:border-accent-primary/20 transition-colors"
        >
          <div className="step-number text-6xl font-bold text-accent-primary/50 mb-4">
            {work.step}
          </div>
          <h3 className="text-gray-300 text-xl font-bold mb-4">{work.title}</h3>
          <p className="text-gray-400">{work.description}</p>
        </div>
      ))}
    </div>
  </section>
);

const Roadmap = () => (
  <section className="py-20">
    <h2 className="font-grotesk text-3xl font-bold text-center mb-12 bg-gradient-to-r from-accent-primary from-30% to-accent-secondary to-70% bg-clip-text text-transparent">
      Roadmap
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8">
      {/* Add your roadmap items here */}
    </div>
  </section>
);

const FAQ = () => (
  <section className="py-20">
    <h2 className="font-grotesk text-3xl font-bold text-center mb-12 bg-gradient-to-r from-accent-primary from-30% to-accent-secondary to-70% bg-clip-text text-transparent">
      FAQs
    </h2>
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Add your FAQ items here */}
    </div>
  </section>
);

const App = () => {
  const endpoint = clusterApiUrl("mainnet-beta");

  // Configure supported wallets
  const wallets = useMemo(
    () => [
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
