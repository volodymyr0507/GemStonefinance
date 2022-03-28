import {useEffect, useState} from 'react';
import useGemFinance from './useGemFinance';
import {LPStat} from '../gem-finance/types';
import useRefresh from './useRefresh';

const useLpStats = (lpTicker: string) => {
  const [stat, setStat] = useState<LPStat>();
  const {slowRefresh} = useRefresh();
  const gemFinance = useGemFinance();

  useEffect(() => {
    async function fetchLpPrice() {
      try {
        setStat(await gemFinance.getLPStat(lpTicker));
      } catch (err) {
        console.error(err);
      }
    }
    fetchLpPrice();
  }, [setStat, gemFinance, slowRefresh, lpTicker]);

  return stat;
};

export default useLpStats;
