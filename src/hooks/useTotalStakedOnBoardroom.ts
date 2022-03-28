import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useGemFinance from './useGemFinance';
import useRefresh from './useRefresh';

const useTotalStakedOnBoardroom = () => {
  const [totalStaked, setTotalStaked] = useState(BigNumber.from(0));
  const gemFinance = useGemFinance();
  const {slowRefresh} = useRefresh();
  const isUnlocked = gemFinance?.isUnlocked;

  useEffect(() => {
    async function fetchTotalStaked() {
      try {
        setTotalStaked(await gemFinance.getTotalStakedInBoardroom());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      fetchTotalStaked();
    }
  }, [isUnlocked, slowRefresh, gemFinance]);

  return totalStaked;
};

export default useTotalStakedOnBoardroom;
