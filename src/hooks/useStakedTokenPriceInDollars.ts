import {useCallback, useEffect, useState} from 'react';

import useGemFinance from './useGemFinance';
import config from '../config';
import ERC20 from '../gem-finance/ERC20';

const useStakedTokenPriceInDollars = (stakedTokenName: string, stakedToken: ERC20) => {
  const [stakedTokenPriceInDollars, setStakedTokenPriceInDollars] = useState('0');
  const gemFinance = useGemFinance();
  const isUnlocked = gemFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await gemFinance.getDepositTokenPriceInDollars(stakedTokenName, stakedToken);
    setStakedTokenPriceInDollars(balance);
  }, [stakedToken, stakedTokenName, gemFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshStakedTokenPriceInDollars = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshStakedTokenPriceInDollars);
    }
  }, [isUnlocked, setStakedTokenPriceInDollars, gemFinance, fetchBalance]);

  return stakedTokenPriceInDollars;
};

export default useStakedTokenPriceInDollars;
