import React, {createContext, useEffect, useState} from 'react';
import {useWallet} from 'use-wallet';
import GemFinance from '../../gem-finance';
import config from '../../config';

export interface GemFinanceContext {
  gemFinance?: GemFinance;
}

export const Context = createContext<GemFinanceContext>({gemFinance: null});

export const GemFinanceProvider: React.FC = ({children}) => {
  const {ethereum, account} = useWallet();
  const [gemFinance, setGemFinance] = useState<GemFinance>();

  useEffect(() => {
    if (!gemFinance) {
      const gem = new GemFinance(config);
      if (account) {
        // wallet was unlocked at initialization
        gem.unlockWallet(ethereum, account);
      }
      setGemFinance(gem);
    } else if (account) {
      gemFinance.unlockWallet(ethereum, account);
    }
  }, [account, ethereum, gemFinance]);

  return <Context.Provider value={{gemFinance}}>{children}</Context.Provider>;
};
