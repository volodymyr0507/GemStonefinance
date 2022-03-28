import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useGemFinance from './useGemFinance';
import useRefresh from './useRefresh';

const useEarningsOnBoardroom = () => {
  const {slowRefresh} = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const gemFinance = useGemFinance();
  const isUnlocked = gemFinance?.isUnlocked;

  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await gemFinance.getEarningsOnBoardroom());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [isUnlocked, gemFinance, slowRefresh]);

  return balance;
};

export default useEarningsOnBoardroom;
