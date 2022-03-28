import {useEffect, useState} from 'react';
import useGemFinance from './useGemFinance';
import {LPStat} from '../gem-finance/types';
import useRefresh from './useRefresh';

const useLpStatsETH = (lpTicker: string) => {
  const [stat, setStat] = useState<LPStat>();
  const {slowRefresh} = useRefresh();
  const gemFinance = useGemFinance();

  useEffect(() => {
    async function fetchLpPrice() {
      try {
        setStat(await gemFinance.getLPStatETH(lpTicker));
      } catch (err) {
        console.error(err);
      }
    }
    fetchLpPrice();
  }, [setStat, gemFinance, slowRefresh, lpTicker]);

  return stat;
};

export default useLpStatsETH;
