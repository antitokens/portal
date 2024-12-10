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

// Utility function to introduce delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Get Token Balance
export const getTokenBalance = async (walletPublicKey, mint) => {
  const accounts = await connection.getParsedTokenAccountsByOwner(
    walletPublicKey,
    { mint }
  );
  await delay(500); // Add delay after the RPC call
  return (
    accounts.value?.reduce((memo, item) => {
      return memo + (item?.account?.data.parsed.info.tokenAmount.uiAmount || 0);
    }, 0) || 0
  );
};

// Check Token Balance
export const checkTokenBalance = async (walletPublicKey, mint) => {
  const balance = await getTokenBalance(walletPublicKey, mint);
  await delay(500); // Add delay after fetching balance
  return balance > 0;
};

// Utility Function to Fetch Slot Time
export const getSlotTime = async (slot) => {
  const { blockTime } = await connection.getBlockTime(slot);
  await delay(500); // Add delay after fetching slot time
  return blockTime * 1000; // Convert to milliseconds
};

// Function to Get Total Holders at Specific Timestamps
export const getTotalHolders = async (mint, timestamps) => {
  const results = [];
  for (const timestamp of timestamps) {
    const slot = await connection.getSlot({ commitment: "confirmed" });
    await delay(500); // Delay after fetching slot
    const adjustedSlot = slot - Math.floor((Date.now() - timestamp) / 400); // Rough slot adjustment
    const accounts = await connection.getTokenLargestAccounts(
      mint,
      "confirmed"
    );
    await delay(500); // Delay after fetching accounts
    results.push(accounts.value?.length || 0);
  }

  const currentHolders = results[0];
  const percentageChanges = results.map(
    (value) => ((currentHolders - value) / currentHolders) * 100
  );

  return results.map((value, index) => ({
    timestamp: timestamps[index],
    totalHolders: value,
    percentageChange: percentageChanges[index],
  }));
};

// Function to Get Token Price History
export const getTokenPriceHistory = async (mint, days = 10) => {
  const timestamps = Array.from(
    { length: days },
    (_, i) => Date.now() - i * 24 * 60 * 60 * 1000
  );

  const fetchTokenPrice = async (timestamp) => {
    // Example: Fetch from an API like CoinGecko, adjust for Solana structure
    // return await fetch(`https://api.example.com/token/${mint}/price?timestamp=${timestamp}`).then(res => res.json());
    await delay(500); // Simulate delay for fetching price
    return Math.random() * 10; // Simulated prices
  };

  const prices = [];
  for (const timestamp of timestamps) {
    prices.push(await fetchTokenPrice(timestamp));
    await delay(500); // Add delay after each price fetch
  }

  return prices.map((price, index) => ({
    timestamp: timestamps[index],
    price,
  }));
};

// Function to Get Token Balance in an LP Contract
export const getTokenBalanceInLP = async (lpAddress, mint) => {
  const accounts = await connection.getParsedTokenAccountsByOwner(
    new PublicKey(lpAddress),
    { mint }
  );
  await delay(500); // Add delay after fetching LP token accounts
  return (
    accounts.value?.reduce((memo, item) => {
      return memo + (item?.account?.data.parsed.info.tokenAmount.uiAmount || 0);
    }, 0) || 0
  );
};
