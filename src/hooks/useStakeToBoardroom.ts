import {useCallback} from 'react';
import useGemFinance from './useGemFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToBoardroom = () => {
  const gemFinance = useGemFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(gemFinance.stakeShareToBoardroom(amount), `Stake ${amount} GSHARE to the boardroom`);
    },
    [gemFinance, handleTransactionReceipt],
  );
  return {onStake: handleStake};
};

export default useStakeToBoardroom;
