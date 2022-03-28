import {useContext} from 'react';
import {Context} from '../contexts/BombFinanceProvider';

const useGemFinance = () => {
  const {gemFinance} = useContext(Context);
  return gemFinance;
};

export default useGemFinance;
