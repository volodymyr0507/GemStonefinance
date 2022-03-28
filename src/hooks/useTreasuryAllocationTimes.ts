import {useEffect, useState} from 'react';
import useGemFinance from './useGemFinance';
import {AllocationTime} from '../gem-finance/types';
import useRefresh from './useRefresh';

const useTreasuryAllocationTimes = () => {
  const {slowRefresh} = useRefresh();
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const gemFinance = useGemFinance();
  useEffect(() => {
    if (gemFinance) {
      gemFinance.getTreasuryNextAllocationTime().then(setTime);
    }
  }, [gemFinance, slowRefresh]);
  return time;
};

export default useTreasuryAllocationTimes;
