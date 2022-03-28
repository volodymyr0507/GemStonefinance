import {useCallback} from 'react';
import useGemFinance from './useGemFinance';
import {Bank} from '../gem-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const gemFinance = useGemFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(gemFinance.exit(bank.contract, bank.poolId), `Redeem ${bank.contract}`);
  }, [bank, gemFinance, handleTransactionReceipt]);

  return {onRedeem: handleRedeem};
};

export default useRedeem;
