import {useCallback, useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useGemFinance from './useGemFinance';
import {ContractName} from '../gem-finance';
import config from '../config';

const useEarnings = (poolName: ContractName, earnTokenName: String, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const gemFinance = useGemFinance();
  const isUnlocked = gemFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await gemFinance.earnedFromBank(poolName, earnTokenName, poolId, gemFinance.myAccount);
    setBalance(balance);
  }, [poolName, earnTokenName, poolId, gemFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, gemFinance, fetchBalance]);

  return balance;
};

export default useEarnings;
