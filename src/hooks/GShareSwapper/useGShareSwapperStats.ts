import {useEffect, useState} from 'react';
import useGemFinance from '../useGemFinance';
import {GShareSwapperStat} from '../../gem-finance/types';
import useRefresh from '../useRefresh';

const useGShareSwapperStats = (account: string) => {
  const [stat, setStat] = useState<GShareSwapperStat>();
  const {fastRefresh /*, slowRefresh*/} = useRefresh();
  const gemFinance = useGemFinance();

  useEffect(() => {
    async function fetchGShareSwapperStat() {
      try {
        if (gemFinance.myAccount) {
          setStat(await gemFinance.getGShareSwapperStat(account));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchGShareSwapperStat();
  }, [setStat, gemFinance, fastRefresh, account]);

  return stat;
};

export default useGShareSwapperStats;
