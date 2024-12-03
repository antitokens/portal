import { useState } from "react";
import { checkTokenBalance } from "../utils/solana";
import { recordVote, hasVoted } from "../utils/api";
import { toast } from "react-toastify";

const VoteOption = ({ wallet, option, mint }) => {
  const [loading, setLoading] = useState(false);

  const handleVote = async () => {
    try {
      setLoading(true);
      if (await hasVoted(wallet.publicKey.toString())) {
        toast.error("You have already voted!");
        return;
      }

      const hasBalance = await checkTokenBalance(wallet.publicKey, mint);
      if (!hasBalance) {
        toast.error(`You don't hold the ${option} token!`);
        return;
      }

      await recordVote(wallet.publicKey.toString(), option);
      toast.success(`Vote recorded for ${option}!`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to record vote.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={loading}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
    >
      {loading ? "Submitting..." : `Vote for ${option}`}
    </button>
  );
};

export default VoteOption;
