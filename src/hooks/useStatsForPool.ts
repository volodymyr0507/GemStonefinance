import {useCallback, useState, useEffect} from 'react';
import useGemFinance from './useGemFinance';
import {Bank} from '../gem-finance';
import {PoolStats} from '../gem-finance/types';
import config from '../config';

const useStatsForPool = (bank: Bank) => {
  const gemFinance = useGemFinance();

  const [poolAPRs, setPoolAPRs] = useState<PoolStats>();

  const fetchAPRsForPool = useCallback(async () => {
    setPoolAPRs(await gemFinance.getPoolAPRs(bank));
  }, [gemFinance, bank]);

  useEffect(() => {
    fetchAPRsForPool().catch((err) => console.error(`Failed to fetch APR info: ${err.stack}`));
    const refreshInterval = setInterval(fetchAPRsForPool, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPoolAPRs, gemFinance, fetchAPRsForPool]);

  return poolAPRs;
};

export default useStatsForPool;
