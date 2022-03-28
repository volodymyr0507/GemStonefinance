import {useEffect, useState} from 'react';
import useGemFinance from './useGemFinance';
import useRefresh from './useRefresh';

const useTotalValueLocked = () => {
  const [totalValueLocked, setTotalValueLocked] = useState<Number>(0);
  const {slowRefresh} = useRefresh();
  const gemFinance = useGemFinance();

  useEffect(() => {
    async function fetchTVL() {
      try {
        setTotalValueLocked(await gemFinance.getTotalValueLocked());
      } catch (err) {
        console.error(err);
      }
    }
    fetchTVL();
  }, [setTotalValueLocked, gemFinance, slowRefresh]);

  return totalValueLocked;
};

export default useTotalValueLocked;
