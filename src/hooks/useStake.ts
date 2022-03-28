import {useCallback} from 'react';
import useGemFinance from './useGemFinance';
import {Bank} from '../gem-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';

const useStake = (bank: Bank) => {
  const gemFinance = useGemFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, bank.depositToken.decimal);
      handleTransactionReceipt(
        gemFinance.stake(bank.contract, bank.poolId, amountBn),
        `Stake ${amount} ${bank.depositTokenName} to ${bank.contract}`,
      );
    },
    [bank, gemFinance, handleTransactionReceipt],
  );
  return {onStake: handleStake};
};

export default useStake;
