import React, {useCallback, useEffect, useState} from 'react';
import Context from './context';
import useGemFinance from '../../hooks/useGemFinance';
import {Bank} from '../../gem-finance';
import config, {bankDefinitions} from '../../config';

const Banks: React.FC = ({children}) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const gemFinance = useGemFinance();
  const isUnlocked = gemFinance?.isUnlocked;

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!gemFinance.isUnlocked) continue;

        // only show pools staked by user
        const balance = await gemFinance.stakedBalanceOnBank(
          bankInfo.contract,
          bankInfo.poolId,
          gemFinance.myAccount,
        );
        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: gemFinance.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName === 'GEM' ? gemFinance.GEM : gemFinance.GSHARE,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [gemFinance, setBanks]);

  useEffect(() => {
    if (gemFinance) {
      fetchPools().catch((err) => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [isUnlocked, gemFinance, fetchPools]);

  return <Context.Provider value={{banks}}>{children}</Context.Provider>;
};

export default Banks;
