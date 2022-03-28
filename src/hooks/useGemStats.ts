import {useEffect, useState} from 'react';
import useGemFinance from './useGemFinance';
import {TokenStat} from '../gem-finance/types';
import useRefresh from './useRefresh';

const useGemStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {fastRefresh} = useRefresh();
  const gemFinance = useGemFinance();

  useEffect(() => {
    async function fetchGemPrice() {
      try {
        setStat(await gemFinance.getGemStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchGemPrice();
  }, [setStat, gemFinance, fastRefresh]);

  return stat;
};

export default useGemStats;
