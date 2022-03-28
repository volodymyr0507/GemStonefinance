import {useEffect, useState} from 'react';
import useGemFinance from './useGemFinance';
import {TokenStat} from '../gem-finance/types';
import useRefresh from './useRefresh';

const useCashPriceInEstimatedTWAP = () => {
  const [stat, setStat] = useState<TokenStat>();
  const gemFinance = useGemFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchCashPrice() {
      try {
        setStat(await gemFinance.getGemStatInEstimatedTWAP());
      } catch (err) {
        console.error(err);
      }
    }
    fetchCashPrice();
  }, [setStat, gemFinance, slowRefresh]);

  return stat;
};

export default useCashPriceInEstimatedTWAP;
