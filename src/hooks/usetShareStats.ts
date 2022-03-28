import {useEffect, useState} from 'react';
import useGemFinance from './useGemFinance';
import {TokenStat} from '../gem-finance/types';
import useRefresh from './useRefresh';

const useShareStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {slowRefresh} = useRefresh();
  const gemFinance = useGemFinance();

  useEffect(() => {
    async function fetchSharePrice() {
      try {
        setStat(await gemFinance.getShareStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchSharePrice();
  }, [setStat, gemFinance, slowRefresh]);

  return stat;
};

export default useShareStats;
