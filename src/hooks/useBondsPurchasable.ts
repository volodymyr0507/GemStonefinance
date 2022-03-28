import {useCallback, useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import ERC20 from '../gem-finance/ERC20';
import useGemFinance from './useGemFinance';
import config from '../config';

const useBondsPurchasable = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const gemFinance = useGemFinance();

  useEffect(() => {
    async function fetchBondsPurchasable() {
      try {
        setBalance(await gemFinance.getBondsPurchasable());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBondsPurchasable();
  }, [setBalance, gemFinance]);

  return balance;
};

export default useBondsPurchasable;
