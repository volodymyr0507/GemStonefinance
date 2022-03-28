import React, {useCallback, useMemo} from 'react';
import Page from '../../components/Page';
import {createGlobalStyle} from 'styled-components';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {useWallet} from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import ExchangeCard from './components/ExchangeCard';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useBondStats from '../../hooks/useBondStats';
import useGemStats from '../../hooks/useGemStats';
import useGemFinance from '../../hooks/useGemFinance';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import {useTransactionAdder} from '../../state/transactions/hooks';
import ExchangeStat from './components/ExchangeStat';
import useTokenBalance from '../../hooks/useTokenBalance';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';
import {getDisplayBalance} from '../../utils/formatBalance';
import {BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN} from '../../gem-finance/constants';

import HomeImage from '../../assets/img/background.gif';
import LaunchCountdown from '../../components/LaunchCountdown';
import config from '../../config';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #d3c7b826;
  }
`;

const Bond: React.FC = () => {
  const {path} = useRouteMatch();
  const {account} = useWallet();
  const gemFinance = useGemFinance();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  const gemStat = useGemStats();
  const cashPrice = useCashPriceInLastTWAP();

  const bondsPurchasable = useBondsPurchasable();

  const bondBalance = useTokenBalance(gemFinance?.GBOND);
  // const scalingFactor = useMemo(() => (cashPrice ? Number(cashPrice).toFixed(4) : null), [cashPrice]);

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await gemFinance.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} GBOND with ${amount} GEM`,
      });
    },
    [gemFinance, addTransaction],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await gemFinance.redeemBonds(amount);
      addTransaction(tx, {summary: `Redeem ${amount} GBOND`});
    },
    [gemFinance, addTransaction],
  );
  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);
  const now = Date.now();

  return (
    <Switch>
      <Page>
        <BackgroundImage />
        {now < config.bondLaunchesAt.getTime() ? <LaunchCountdown deadline={config.bondLaunchesAt} description='Home' descriptionLink='/' />
        : !!account ? (
          <>
            <Route exact path={path}>
              <PageHeader icon={'🏦'} title="Buy &amp; Redeem Bonds" subtitle="Earn premiums upon redemption" />
            </Route>
            <StyledBond>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Purchase"
                  fromToken={gemFinance.GEM}
                  fromTokenName="GEM"
                  toToken={gemFinance.GBOND}
                  toTokenName="GBOND"
                  priceDesc={
                    !isBondPurchasable
                      ? 'GEM is over peg'
                      : getDisplayBalance(bondsPurchasable, 18, 4) + ' GBOND available for purchase'
                  }
                  onExchange={handleBuyBonds}
                  disabled={!bondStat || isBondRedeemable}
                />
              </StyledCardWrapper>
              <StyledStatsWrapper>
                <ExchangeStat
                  tokenName="4,000 GEM"
                  description="Last-Hour TWAP Price"
                  price={Number(gemStat?.tokenInFtm).toFixed(4) || '-'}
                />
                <Spacer size="md" />
                <ExchangeStat
                  tokenName="1,000 GBOND"
                  description="Current Price: (GEM)^2"
                  price={Number(bondStat?.tokenInFtm).toFixed(4) || '-'}
                />
              </StyledStatsWrapper>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Redeem"
                  fromToken={gemFinance.GBOND}
                  fromTokenName="GBOND"
                  toToken={gemFinance.GEM}
                  toTokenName="GEM"
                  priceDesc={`${getDisplayBalance(bondBalance)} GBOND Available in wallet`}
                  onExchange={handleRedeemBonds}
                  disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
                  disabledDescription={!isBondRedeemable ? `Enabled when 4,000 GEM > ${BOND_REDEEM_PRICE}ETH` : null}
                />
              </StyledCardWrapper>
            </StyledBond>
          </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

const StyledBond = styled.div`
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledStatsWrapper = styled.div`
  display: flex;
  flex: 0.8;
  margin: 0 20px;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 80%;
    margin: 16px 0;
  }
`;

export default Bond;
