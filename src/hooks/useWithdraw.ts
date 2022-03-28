import {useCallback} from 'react';
import useGemFinance from './useGemFinance';
import {Bank} from '../gem-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';

const useWithdraw = (bank: Bank) => {
  const gemFinance = useGemFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, bank.depositToken.decimal);
      handleTransactionReceipt(
        gemFinance.unstake(bank.contract, bank.poolId, amountBn),
        `Withdraw ${amount} ${bank.depositTokenName} from ${bank.contract}`,
      );
    },
    [bank, gemFinance, handleTransactionReceipt],
  );
  return {onWithdraw: handleWithdraw};
};

export default useWithdraw;
