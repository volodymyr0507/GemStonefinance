import {useEffect, useState} from 'react';
import useGemFinance from './useGemFinance';
import useRefresh from './useRefresh';

const useFetchBoardroomAPR = () => {
  const [apr, setApr] = useState<number>(0);
  const gemFinance = useGemFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchBoardroomAPR() {
      try {
        setApr(await gemFinance.getBoardroomAPR());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBoardroomAPR();
  }, [setApr, gemFinance, slowRefresh]);

  return apr;
};

export default useFetchBoardroomAPR;
