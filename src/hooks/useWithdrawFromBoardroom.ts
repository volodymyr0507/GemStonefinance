import {useCallback} from 'react';
import useGemFinance from './useGemFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromBoardroom = () => {
  const gemFinance = useGemFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        gemFinance.withdrawShareFromBoardroom(amount),
        `Withdraw ${amount} GSHARE from the boardroom`,
      );
    },
    [gemFinance, handleTransactionReceipt],
  );
  return {onWithdraw: handleWithdraw};
};

export default useWithdrawFromBoardroom;
