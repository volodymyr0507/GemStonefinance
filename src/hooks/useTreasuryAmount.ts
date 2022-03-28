import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useGemFinance from './useGemFinance';

const useTreasuryAmount = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const gemFinance = useGemFinance();

  useEffect(() => {
    if (gemFinance) {
      const {Treasury} = gemFinance.contracts;
      gemFinance.GEM.balanceOf(Treasury.address).then(setAmount);
    }
  }, [gemFinance]);
  return amount;
};

export default useTreasuryAmount;
