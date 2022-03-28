import {useEffect, useState} from 'react';
import useGemFinance from './useGemFinance';
import {BigNumber} from 'ethers';
import useRefresh from './useRefresh';

const useCurrentEpoch = () => {
  const [currentEpoch, setCurrentEpoch] = useState<BigNumber>(BigNumber.from(0));
  const gemFinance = useGemFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchCurrentEpoch() {
      try {
        setCurrentEpoch(await gemFinance.getCurrentEpoch());
      } catch (err) {
        console.error(err);
      }
    }
    fetchCurrentEpoch();
  }, [setCurrentEpoch, gemFinance, slowRefresh]);

  return currentEpoch;
};

export default useCurrentEpoch;
