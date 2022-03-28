import React, {/*useCallback, useEffect, */ useMemo, useState} from 'react';
import Page from '../../components/Page';
import BondImage from '../../assets/img/pit.png';
import {createGlobalStyle} from 'styled-components';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {useWallet} from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import {Box, /* Paper, Typography,*/ Button, Grid} from '@material-ui/core';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useGemFinance from '../../hooks/useGemFinance';
import {getDisplayBalance /*, getBalance*/} from '../../utils/formatBalance';
import {BigNumber /*, ethers*/} from 'ethers';
import useSwapGBondToGShare from '../../hooks/GShareSwapper/useSwapGBondToGShare';
import useApprove, {ApprovalState} from '../../hooks/useApprove';
import useGShareSwapperStats from '../../hooks/GShareSwapper/useGShareSwapperStats';
import TokenInput from '../../components/TokenInput';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import TokenSymbol from '../../components/TokenSymbol';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${BondImage}) no-repeat !important;
    background-size: cover !important;
    background-color: #d3c7b826;
  }
`;

function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const Sbs: React.FC = () => {
  const {path} = useRouteMatch();
  const {account} = useWallet();
  const gemFinance = useGemFinance();
  const [bbondAmount, setBbondAmount] = useState('');
  const [bshareAmount, setGshareAmount] = useState('');

  const [approveStatus, approve] = useApprove(gemFinance.GBOND, gemFinance.contracts.GShareSwapper.address);
  const {onSwapGShare} = useSwapGBondToGShare();
  const bshareSwapperStat = useGShareSwapperStats(account);

  const bshareBalance = useMemo(
    () => (bshareSwapperStat ? Number(bshareSwapperStat.bshareBalance) : 0),
    [bshareSwapperStat],
  );
  const bondBalance = useMemo(
    () => (bshareSwapperStat ? Number(bshareSwapperStat.bbondBalance) : 0),
    [bshareSwapperStat],
  );

  const handleGBondChange = async (e: any) => {
    if (e.currentTarget.value === '') {
      setBbondAmount('');
      setGshareAmount('');
      return;
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setBbondAmount(e.currentTarget.value);
    const updateGShareAmount = await gemFinance.estimateAmountOfGShare(e.currentTarget.value);
    setGshareAmount(updateGShareAmount);
  };

  const handleGBondSelectMax = async () => {
    setBbondAmount(String(bondBalance));
    const updateGShareAmount = await gemFinance.estimateAmountOfGShare(String(bondBalance));
    setGshareAmount(updateGShareAmount);
  };

  const handleGShareSelectMax = async () => {
    setGshareAmount(String(bshareBalance));
    const rateGSharePerGem = (await gemFinance.getGShareSwapperStat(account)).rateGSharePerGem;
    const updateGBondAmount = BigNumber.from(10)
      .pow(30)
      .div(BigNumber.from(rateGSharePerGem))
      .mul(Number(bshareBalance) * 1e6);
    setBbondAmount(getDisplayBalance(updateGBondAmount, 18, 6));
  };

  const handleGShareChange = async (e: any) => {
    const inputData = e.currentTarget.value;
    if (inputData === '') {
      setGshareAmount('');
      setBbondAmount('');
      return;
    }
    if (!isNumeric(inputData)) return;
    setGshareAmount(inputData);
    const rateGSharePerGem = (await gemFinance.getGShareSwapperStat(account)).rateGSharePerGem;
    const updateGBondAmount = BigNumber.from(10)
      .pow(30)
      .div(BigNumber.from(rateGSharePerGem))
      .mul(Number(inputData) * 1e6);
    setBbondAmount(getDisplayBalance(updateGBondAmount, 18, 6));
  };

  return (
    <Switch>
      <Page>
        <BackgroundImage />
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader icon={'🏦'} title="GBond -> GShare Swap" subtitle="Swap GBond to GShare" />
            </Route>
            <Box mt={5}>
              <Grid container justify="center" spacing={6}>
                <StyledBoardroom>
                  <StyledCardsWrapper>
                    <StyledCardWrapper>
                      <Card>
                        <CardContent>
                          <StyledCardContentInner>
                            <StyledCardTitle>GBonds</StyledCardTitle>
                            <StyledExchanger>
                              <StyledToken>
                                <StyledCardIcon>
                                  <TokenSymbol symbol={gemFinance.GBOND.symbol} size={54} />
                                </StyledCardIcon>
                              </StyledToken>
                            </StyledExchanger>
                            <Grid item xs={12}>
                              <TokenInput
                                onSelectMax={handleGBondSelectMax}
                                onChange={handleGBondChange}
                                value={bbondAmount}
                                max={bondBalance}
                                symbol="GBond"
                              ></TokenInput>
                            </Grid>
                            <StyledDesc>{`${bondBalance} GBOND Available in Wallet`}</StyledDesc>
                          </StyledCardContentInner>
                        </CardContent>
                      </Card>
                    </StyledCardWrapper>
                    <Spacer size="lg" />
                    <StyledCardWrapper>
                      <Card>
                        <CardContent>
                          <StyledCardContentInner>
                            <StyledCardTitle>GShare</StyledCardTitle>
                            <StyledExchanger>
                              <StyledToken>
                                <StyledCardIcon>
                                  <TokenSymbol symbol={gemFinance.GSHARE.symbol} size={54} />
                                </StyledCardIcon>
                              </StyledToken>
                            </StyledExchanger>
                            <Grid item xs={12}>
                              <TokenInput
                                onSelectMax={handleGShareSelectMax}
                                onChange={handleGShareChange}
                                value={bshareAmount}
                                max={bshareBalance}
                                symbol="GShare"
                              ></TokenInput>
                            </Grid>
                            <StyledDesc>{`${bshareBalance} GSHARE Available in Swapper`}</StyledDesc>
                          </StyledCardContentInner>
                        </CardContent>
                      </Card>
                    </StyledCardWrapper>
                  </StyledCardsWrapper>
                </StyledBoardroom>
              </Grid>
            </Box>

            <Box mt={5}>
              <Grid container justify="center">
                <Grid item xs={8}>
                  <Card>
                    <CardContent>
                      <StyledApproveWrapper>
                        {approveStatus !== ApprovalState.APPROVED ? (
                          <Button
                            disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                            color="primary"
                            variant="contained"
                            onClick={approve}
                            size="medium"
                          >
                            Approve GBOND
                          </Button>
                        ) : (
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => onSwapGShare(bbondAmount.toString())}
                            size="medium"
                          >
                            Swap
                          </Button>
                        )}
                      </StyledApproveWrapper>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
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
    width: 100%;
  }
`;

const StyledApproveWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`;
const StyledCardTitle = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  font-weight: 700;
  height: 64px;
  justify-content: center;
  margin-top: ${(props) => -props.theme.spacing[3]}px;
`;

const StyledCardIcon = styled.div`
  background-color: ${(props) => props.theme.color.grey[900]};
  width: 72px;
  height: 72px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledExchanger = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
`;

const StyledToken = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledDesc = styled.span``;

export default Sbs;
