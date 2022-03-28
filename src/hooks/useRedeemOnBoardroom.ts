import {useCallback} from 'react';
import useGemFinance from './useGemFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnBoardroom = (description?: string) => {
  const gemFinance = useGemFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    const alertDesc = description || 'Redeem GSHARE from Boardroom';
    handleTransactionReceipt(gemFinance.exitFromBoardroom(), alertDesc);
  }, [gemFinance, description, handleTransactionReceipt]);
  return {onRedeem: handleRedeem};
};

export default useRedeemOnBoardroom;
