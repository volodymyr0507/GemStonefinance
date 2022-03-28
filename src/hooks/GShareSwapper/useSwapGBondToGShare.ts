import {useCallback} from 'react';
import useGemFinance from '../useGemFinance';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
// import { BigNumber } from "ethers";
import {parseUnits} from 'ethers/lib/utils';

const useSwapGBondToGShare = () => {
  const gemFinance = useGemFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleSwapGShare = useCallback(
    (bbondAmount: string) => {
      const bbondAmountBn = parseUnits(bbondAmount, 18);
      handleTransactionReceipt(gemFinance.swapGBondToGShare(bbondAmountBn), `Swap ${bbondAmount} GBond to GShare`);
    },
    [gemFinance, handleTransactionReceipt],
  );
  return {onSwapGShare: handleSwapGShare};
};

export default useSwapGBondToGShare;
