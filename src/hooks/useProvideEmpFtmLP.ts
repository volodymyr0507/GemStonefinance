import {useCallback} from 'react';
import useGemFinance from './useGemFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';
import {TAX_OFFICE_ADDR} from '../utils/constants';

const useProvideGemFtmLP = () => {
  const gemFinance = useGemFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleProvideGemFtmLP = useCallback(
    (ftmAmount: string, gemAmount: string) => {
      const gemAmountBn = parseUnits(gemAmount);
      handleTransactionReceipt(
        gemFinance.provideGemFtmLP(ftmAmount, gemAmountBn),
        `Provide GEM-ETH LP ${gemAmount} ${ftmAmount} using ${TAX_OFFICE_ADDR}`,
      );
    },
    [gemFinance, handleTransactionReceipt],
  );
  return {onProvideGemFtmLP: handleProvideGemFtmLP};
};

export default useProvideGemFtmLP;
