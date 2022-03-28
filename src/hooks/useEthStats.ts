import {useEffect, useState} from 'react';
import useGemFinance from './useGemFinance';
import useRefresh from './useRefresh';

const useEthStats = () => {
  const [stat, setStat] = useState<Number>();
  const {slowRefresh} = useRefresh();
  const gemFinance = useGemFinance();

  useEffect(() => {
    async function fetchSharePrice() {
      try {
        setStat(await gemFinance.getETHPriceUSD());
      } catch (err) {
        console.error(err);
      }
    }
    fetchSharePrice();
  }, [setStat, gemFinance, slowRefresh]);

  return stat;
};

export default useEthStats;
