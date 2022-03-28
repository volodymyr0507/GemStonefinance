import {useEffect, useState} from 'react';
import useRefresh from '../useRefresh';
import useGemFinance from '../useGemFinance';

const useClaimRewardCheck = () => {
  const {slowRefresh} = useRefresh();
  const [canClaimReward, setCanClaimReward] = useState(false);
  const gemFinance = useGemFinance();
  const isUnlocked = gemFinance?.isUnlocked;

  useEffect(() => {
    async function canUserClaimReward() {
      try {
        setCanClaimReward(await gemFinance.canUserClaimRewardFromBoardroom());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      canUserClaimReward();
    }
  }, [isUnlocked, slowRefresh, gemFinance]);

  return canClaimReward;
};

export default useClaimRewardCheck;
