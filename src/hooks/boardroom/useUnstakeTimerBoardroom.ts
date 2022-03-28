import {useEffect, useState} from 'react';
import useGemFinance from '../useGemFinance';
import {AllocationTime} from '../../gem-finance/types';

const useUnstakeTimerBoardroom = () => {
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const gemFinance = useGemFinance();

  useEffect(() => {
    if (gemFinance) {
      gemFinance.getUserUnstakeTime().then(setTime);
    }
  }, [gemFinance]);
  return time;
};

export default useUnstakeTimerBoardroom;
