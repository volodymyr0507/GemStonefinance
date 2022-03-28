import {useEffect, useState} from 'react';
import useGemFinance from './useGemFinance';
import {TokenStat} from '../gem-finance/types';
import useRefresh from './useRefresh';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {slowRefresh} = useRefresh();
  const gemFinance = useGemFinance();

  useEffect(() => {
    async function fetchBondPrice() {
      try {
        setStat(await gemFinance.getBondStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBondPrice();
  }, [setStat, gemFinance, slowRefresh]);

  return stat;
};

export default useBondStats;
