import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useGemFinance from './useGemFinance';
import useRefresh from './useRefresh';

const useStakedBalanceOnBoardroom = () => {
  const {slowRefresh} = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const gemFinance = useGemFinance();
  const isUnlocked = gemFinance?.isUnlocked;
  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await gemFinance.getStakedSharesOnBoardroom());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [slowRefresh, isUnlocked, gemFinance]);
  return balance;
};

export default useStakedBalanceOnBoardroom;
