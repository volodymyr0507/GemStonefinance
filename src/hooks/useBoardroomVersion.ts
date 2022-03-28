import {useCallback, useEffect, useState} from 'react';
import useGemFinance from './useGemFinance';
import useStakedBalanceOnBoardroom from './useStakedBalanceOnBoardroom';

const useBoardroomVersion = () => {
  const [boardroomVersion, setBoardroomVersion] = useState('latest');
  const gemFinance = useGemFinance();
  const stakedBalance = useStakedBalanceOnBoardroom();

  const updateState = useCallback(async () => {
    setBoardroomVersion(await gemFinance.fetchBoardroomVersionOfUser());
  }, [gemFinance?.isUnlocked, stakedBalance]);

  useEffect(() => {
    if (gemFinance?.isUnlocked) {
      updateState().catch((err) => console.error(err.stack));
    }
  }, [gemFinance?.isUnlocked, stakedBalance]);

  return boardroomVersion;
};

export default useBoardroomVersion;
