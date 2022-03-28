import {useEffect, useState} from 'react';
import useGemFinance from '../useGemFinance';
import useRefresh from '../useRefresh';

const useWithdrawCheck = () => {
  const [canWithdraw, setCanWithdraw] = useState(false);
  const gemFinance = useGemFinance();
  const {slowRefresh} = useRefresh();
  const isUnlocked = gemFinance?.isUnlocked;

  useEffect(() => {
    async function canUserWithdraw() {
      try {
        setCanWithdraw(await gemFinance.canUserUnstakeFromBoardroom());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      canUserWithdraw();
    }
  }, [isUnlocked, gemFinance, slowRefresh]);

  return canWithdraw;
};

export default useWithdrawCheck;
