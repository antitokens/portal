module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CF_WORKER_URL: process.env.NEXT_PUBLIC_CF_WORKER_URL,
    NEXT_PUBLIC_ANTI_TOKEN_MINT: process.env.NEXT_PUBLIC_ANTI_TOKEN_MINT,
    NEXT_PUBLIC_PRO_TOKEN_MINT: process.env.NEXT_PUBLIC_PRO_TOKEN_MINT,
  },
};
