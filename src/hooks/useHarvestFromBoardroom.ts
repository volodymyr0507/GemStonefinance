import {useCallback} from 'react';
import useGemFinance from './useGemFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestFromBoardroom = () => {
  const gemFinance = useGemFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(gemFinance.harvestCashFromBoardroom(), 'Claim GEM from Boardroom');
  }, [gemFinance, handleTransactionReceipt]);

  return {onReward: handleReward};
};

export default useHarvestFromBoardroom;
