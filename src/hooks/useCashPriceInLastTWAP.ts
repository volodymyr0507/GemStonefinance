import {useCallback, useEffect, useState} from 'react';
import useGemFinance from './useGemFinance';
import config from '../config';
import {BigNumber} from 'ethers';

const useCashPriceInLastTWAP = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const gemFinance = useGemFinance();

  const fetchCashPrice = useCallback(async () => {
    setPrice(await gemFinance.getGemPriceInLastTWAP());
  }, [gemFinance]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch GEM price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPrice, gemFinance, fetchCashPrice]);

  return price;
};

export default useCashPriceInLastTWAP;
