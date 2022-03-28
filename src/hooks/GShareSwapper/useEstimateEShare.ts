import {useCallback, useEffect, useState} from 'react';
import useGemFinance from '../useGemFinance';
import {useWallet} from 'use-wallet';
import {BigNumber} from 'ethers';
import {parseUnits} from 'ethers/lib/utils';

const useEstimateGShare = (bbondAmount: string) => {
  const [estimateAmount, setEstimateAmount] = useState<string>('');
  const {account} = useWallet();
  const gemFinance = useGemFinance();

  const estimateAmountOfGShare = useCallback(async () => {
    const bbondAmountBn = parseUnits(bbondAmount);
    const amount = await gemFinance.estimateAmountOfGShare(bbondAmountBn.toString());
    setEstimateAmount(amount);
  }, [account]);

  useEffect(() => {
    if (account) {
      estimateAmountOfGShare().catch((err) => console.error(`Failed to get estimateAmountOfGShare: ${err.stack}`));
    }
  }, [account, estimateAmountOfGShare]);

  return estimateAmount;
};

export default useEstimateGShare;
