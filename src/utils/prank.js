import { Connection, PublicKey } from "@solana/web3.js";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const endpoint = process.env.NEXT_PUBLIC_SOL_RPC;
const connection = new Connection(endpoint);

// Token Programs
export const ANTI_TOKEN_MINT = new PublicKey(
  process.env.NEXT_PUBLIC_ANTI_TOKEN_MINT
);
export const PRO_TOKEN_MINT = new PublicKey(
  process.env.NEXT_PUBLIC_PRO_TOKEN_MINT
);

// Placeholder values for testing visuals
const placeholderHoldersData = [
  { timestamp: Date.now(), totalHolders: 1000, percentageChange: 0 },
  {
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    totalHolders: 950 + Math.round(Math.random() * 100),
    percentageChange: -5 + Math.round(Math.random() * 10),
  },
  {
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
    totalHolders: 900 + Math.round(Math.random() * 100),
    percentageChange: -10 + Math.round(Math.random() * 10),
  },
  {
    timestamp: Date.now() - 30 * 24 * 60 * 60 * 1000,
    totalHolders: 800 + Math.round(Math.random() * 100),
    percentageChange: -20 + Math.round(Math.random() * 10),
  },
  {
    timestamp: Date.now() - 365 * 24 * 60 * 60 * 1000,
    totalHolders: 500 + Math.round(Math.random() * 100),
    percentageChange: -50 + Math.round(Math.random() * 10),
  },
];

const placeholderPriceHistory = Array.from({ length: 10 }, (_, i) => ({
  timestamp: Date.now() - i * 24 * 60 * 60 * 1000,
  price: 5 + Math.random() * 5, // Random prices between $5 and $10
}));

const placeholderLPBalance = {
  antiTokenLP: Math.random() * 100000,
  proTokenLP: Math.random() * 100000,
};

export const getTokenBalance = async (walletPublicKey, mint) => {
  // Placeholder: Return random balance
  return Math.random() * 1000;
};

export const checkTokenBalance = async (walletPublicKey, mint) => {
  // Placeholder: Return true
  return true;
};

export const getSlotTime = async (slot) => {
  // Placeholder: Return current timestamp
  return Date.now();
};

export const getTotalHolders = async (mint, timestamps) => {
  // Placeholder: Return static data
  // const results = await Promise.all(
  //   timestamps.map(async (timestamp) => {
  //     const slot = await connection.getSlot({ commitment: "confirmed" });
  //     const adjustedSlot = slot - Math.floor((Date.now() - timestamp) / 400);
  //     const accounts = await connection.getTokenLargestAccounts(mint, "confirmed");
  //     return accounts.value?.length || 0;
  //   })
  // );
  return placeholderHoldersData;
};

export const getTokenPriceHistory = async (mint, days = 10) => {
  // Placeholder: Return static price history
  // const timestamps = Array.from(
  //   { length: days },
  //   (_, i) => Date.now() - i * 24 * 60 * 60 * 1000
  // );
  // const prices = await Promise.all(
  //   timestamps.map(async (timestamp) => {
  //     return Math.random() * 10;
  //   })
  // );
  return placeholderPriceHistory;
};

export const getTokenBalanceInLP = async (lpAddress, mint) => {
  // Placeholder: Return static LP balance
  // const accounts = await connection.getParsedTokenAccountsByOwner(
  //   new PublicKey(lpAddress),
  //   { mint }
  // );
  return mint === ANTI_TOKEN_MINT
    ? placeholderLPBalance.antiTokenLP
    : placeholderLPBalance.proTokenLP;
};
