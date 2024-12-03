import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("mainnet-beta"));

// Token Programs
const ANTI_TOKEN_MINT = new PublicKey(process.env.NEXT_PUBLIC_ANTI_TOKEN_MINT);
const PRO_TOKEN_MINT = new PublicKey(process.env.NEXT_PUBLIC_PRO_TOKEN_MINT);

export const checkTokenBalance = async (walletPublicKey, mint) => {
  const accounts = await connection.getParsedTokenAccountsByOwner(
    walletPublicKey,
    { mint }
  );
  return accounts.value.length > 0 && accounts.value[0].account.data.parsed.info.tokenAmount.uiAmount > 0;
};
