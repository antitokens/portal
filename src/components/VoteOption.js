import { useState } from "react";
import { checkTokenBalance } from "../utils/solana";
import { recordVote, hasVoted } from "../utils/api";
import { toast } from "react-toastify";

const VoteOption = ({ wallet, option, mint, disabled }) => {
  const [loading, setLoading] = useState(false);

  const handleVote = async () => {
    if (disabled || loading) return;

    try {
      setLoading(true);

      // Check if the user has already voted
      if (await hasVoted(wallet.publicKey.toString())) {
        toast.error("You have already voted!");
        return;
      }

      // Check token balance
      const hasBalance = await checkTokenBalance(wallet.publicKey, mint);
      if (!hasBalance) {
        toast.error(`You must hold the ${option} token to vote!`);
        return;
      }

      // Record the vote
      await recordVote(wallet.publicKey.toString(), option);
      toast.success(`Your vote for "${option}" has been recorded!`);
    } catch (error) {
      console.error("Vote submission failed:", error);
      toast.error("An error occurred while recording your vote.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={disabled || loading}
      className={`w-full px-5 py-3 rounded-lg font-semibold text-lg transition-all ${
        disabled || loading
          ? "bg-gray-500 text-gray-300 cursor-not-allowed"
          : "bg-accent-primary text-white hover:bg-accent-secondary"
      }`}
    >
      {loading ? "Submitting..." : `Vote ${option}`}
    </button>
  );
};

export default VoteOption;
