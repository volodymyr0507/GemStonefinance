import React, {useMemo, useState} from 'react';
import Page from '../../components/Page';
import {createGlobalStyle} from 'styled-components';
import HomeImage from '../../assets/img/background.gif';
import useLpStats from '../../hooks/useLpStats';
import {Box, Button, Grid, Paper, Typography} from '@material-ui/core';
import useGemStats from '../../hooks/useGemStats';
import TokenInput from '../../components/TokenInput';
import useGemFinance from '../../hooks/useGemFinance';
import {useWallet} from 'use-wallet';
import useTokenBalance from '../../hooks/useTokenBalance';
import {getDisplayBalance} from '../../utils/formatBalance';
import useApproveTaxOffice from '../../hooks/useApproveTaxOffice';
import {ApprovalState} from '../../hooks/useApprove';
import useProvideGemFtmLP from '../../hooks/useProvideGemFtmLP';
import {Alert} from '@material-ui/lab';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
    background-color: #d3c7b826;
  }
`;
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const ProvideLiquidity = () => {
  const [gemAmount, setGemAmount] = useState(0);
  const [ftmAmount, setFtmAmount] = useState(0);
  const [lpTokensAmount, setLpTokensAmount] = useState(0);
  const {balance} = useWallet();
  const gemStats = useGemStats();
  const gemFinance = useGemFinance();
  const [approveTaxOfficeStatus, approveTaxOffice] = useApproveTaxOffice();
  const gemBalance = useTokenBalance(gemFinance.GEM);
  const btcBalance = useTokenBalance(gemFinance.ETH);

  const ftmBalance = (btcBalance / 1e18).toFixed(4);
  const {onProvideGemFtmLP} = useProvideGemFtmLP();
  const gemFtmLpStats = useLpStats('GEM-ETH-LP');

  const gemLPStats = useMemo(() => (gemFtmLpStats ? gemFtmLpStats : null), [gemFtmLpStats]);
  const gemPriceInMATIC = useMemo(() => (gemStats ? Number(gemStats.tokenInFtm).toFixed(2) : null), [gemStats]);
  const ftmPriceInGEM = useMemo(() => (gemStats ? Number(1 / gemStats.tokenInFtm).toFixed(2) : null), [gemStats]);
  // const classes = useStyles();

  const handleGemChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setGemAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setGemAmount(e.currentTarget.value);
    const quoteFromSpooky = await gemFinance.quoteFromSpooky(e.currentTarget.value, 'GEM');
    setFtmAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / gemLPStats.ftmAmount);
  };

  const handleFtmChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setFtmAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setFtmAmount(e.currentTarget.value);
    const quoteFromSpooky = await gemFinance.quoteFromSpooky(e.currentTarget.value, 'ETH');
    setGemAmount(quoteFromSpooky);

    setLpTokensAmount(quoteFromSpooky / gemLPStats.tokenAmount);
  };
  const handleGemSelectMax = async () => {
    const quoteFromSpooky = await gemFinance.quoteFromSpooky(getDisplayBalance(gemBalance), 'GEM');
    setGemAmount(getDisplayBalance(gemBalance));
    setFtmAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / gemLPStats.ftmAmount);
  };
  const handleFtmSelectMax = async () => {
    const quoteFromSpooky = await gemFinance.quoteFromSpooky(ftmBalance, 'MATIC');
    setFtmAmount(ftmBalance);
    setGemAmount(quoteFromSpooky);
    setLpTokensAmount(ftmBalance / gemLPStats.ftmAmount);
  };
  return (
    <Page>
      <BackgroundImage />
      <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
        Provide Liquidity
      </Typography>

      <Grid container justify="center">
        <Box style={{width: '600px'}}>
          <Alert variant="filled" severity="warning" style={{marginBottom: '10px'}}>
            <b>
              This and{' '}
              <a href="https://quickswap.exchange/" rel="noopener noreferrer" target="_blank">
                Quickswap
              </a>{' '}
              are the only ways to provide Liquidity on GEM-ETH pair without paying tax.
            </b>
          </Alert>
          <Grid item xs={12} sm={12}>
            <Paper>
              <Box mt={4}>
                <Grid item xs={12} sm={12} style={{borderRadius: 15}}>
                  <Box p={4}>
                    <Grid container>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handleGemSelectMax}
                          onChange={handleGemChange}
                          value={gemAmount}
                          max={getDisplayBalance(gemBalance)}
                          symbol={'GEM'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handleFtmSelectMax}
                          onChange={handleFtmChange}
                          value={ftmAmount}
                          max={ftmBalance}
                          symbol={'ETH'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <p>1 GEM = {gemPriceInMATIC} MATIC</p>
                        <p>1 MATIC = {ftmPriceInGEM} GEM</p>
                        <p>LP tokens ≈ {lpTokensAmount.toFixed(2)}</p>
                      </Grid>
                      <Grid xs={12} justifyContent="center" style={{textAlign: 'center'}}>
                        {approveTaxOfficeStatus === ApprovalState.APPROVED ? (
                          <Button
                            variant="contained"
                            onClick={() => onProvideGemFtmLP(ftmAmount.toString(), gemAmount.toString())}
                            color="primary"
                            style={{margin: '0 10px', color: '#fff'}}
                          >
                            Supply
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => approveTaxOffice()}
                            color="secondary"
                            style={{margin: '0 10px'}}
                          >
                            Approve
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Grid>
    </Page>
  );
};

export default ProvideLiquidity;
