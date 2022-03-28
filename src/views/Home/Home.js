import React, {useMemo} from 'react';
import Page from '../../components/Page';
import {createGlobalStyle} from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useGemStats from '../../hooks/useGemStats';
import useLpStats from '../../hooks/useLpStats';
import useLpStatsETH from '../../hooks/useLpStatsETH';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import useaShareStats from '../../hooks/useGShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import {Gem as gemProd, GShare as aShareProd} from '../../gem-finance/deployments/deployments.mainnet.json';
import {roundAndFormatNumber} from '../../0x';
import MetamaskFox from '../../assets/img/metamask-fox.svg';

import {Box, Button, Card, CardContent, Grid, Paper} from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import {makeStyles} from '@material-ui/core/styles';
import useGemFinance from '../../hooks/useGemFinance';
import {ReactComponent as IconTelegram} from '../../assets/img/telegram.svg';

import GemImage from '../../assets/img/gem-animated.png';

import HomeImage from '../../assets/img/background.gif';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #d3c7b826;
  }
`;
//black #171923
// const BackgroundImage = createGlobalStyle`
//   body {
//     background-color: grey;
//     background-size: cover !important;
//   }
// `;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      // marginTop: '10px'
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const gemFtmLpStats = useLpStatsETH('GEM-ETH-LP');
  const aShareFtmLpStats = useLpStats('GSHARE-MATIC-LP');
  const gemStats = useGemStats();
  const aShareStats = useaShareStats();
  const tBondStats = useBondStats();
  const gemFinance = useGemFinance();

  const gem = gemProd;
  const aShare = aShareProd;

  const buyGemAddress =
    'https://quickswap.exchange/#/swap?inputCurrency=0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619&outputCurrency=' +
    gem.address;
  const buyGShareAddress = 
    'https://quickswap.exchange/#/swap?outputCurrency=' + 
    aShare.address;

  const gemLPStats = useMemo(() => (gemFtmLpStats ? gemFtmLpStats : null), [gemFtmLpStats]);
  const bshareLPStats = useMemo(() => (aShareFtmLpStats ? aShareFtmLpStats : null), [aShareFtmLpStats]);
  const gemPriceInDollars = useMemo(
    () => (gemStats ? Number(gemStats.priceInDollars).toFixed(2) : null),
    [gemStats],
  );
  const gemPriceInMATIC = useMemo(() => (gemStats ? Number(gemStats.tokenInFtm).toFixed(4) : null), [gemStats]);
  console.log("gemprice",gemPriceInMATIC );
  const gemCirculatingSupply = useMemo(() => (gemStats ? String(gemStats.circulatingSupply) : null), [gemStats]);
  const gemTotalSupply = useMemo(() => (gemStats ? String(gemStats.totalSupply) : null), [gemStats]);

  const aSharePriceInDollars = useMemo(
    () => (aShareStats ? Number(aShareStats.priceInDollars).toFixed(2) : null),
    [aShareStats],
  );
  const aSharePriceInMATIC = useMemo(
    () => (aShareStats ? Number(aShareStats.tokenInFtm).toFixed(4) : null),
    [aShareStats],
  );
  const aShareCirculatingSupply = useMemo(
    () => (aShareStats ? String(aShareStats.circulatingSupply) : null),
    [aShareStats],
  );
  const aShareTotalSupply = useMemo(() => (aShareStats ? String(aShareStats.totalSupply) : null), [aShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInMATIC = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const gemLpZap = useZap({depositTokenName: 'GEM-ETH-LP'});
  const bshareLpZap = useZap({depositTokenName: 'GSHARE-MATIC-LP'});

  const [onPresentGemZap, onDissmissGemZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        gemLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissGemZap();
      }}
      tokenName={'GEM-ETH-LP'}
    />,
  );

  const [onPresentGshareZap, onDissmissGshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissGshareZap();
      }}
      tokenName={'GSHARE-MATIC-LP'}
    />,
  );

  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid
          item
          xs={12}
          sm={4}
          style={{display: 'flex', justifyContent: 'center', verticalAlign: 'middle', overflow: 'hidden'}}
        >
          <img src={GemImage} style={{maxHeight: '240px'}} />
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={8}>
          <Paper>
            <Box p={4} style={{textAlign: 'center'}}>
              <h2>Welcome to Gem Stone Finance</h2>
              <p>
              GEM is an algorithmic stablecoin on the CRONOS blockchain, Pegged to the price of Ethereum.              </p>
              <p>
                <strong>$GEM is pegged via algorithm to a 4,000:1 ratio to ETH.</strong>

               {/* <p> Stake your GEM-ETH LP in the Farm to earn GSHARE rewards. Then stake your earned GSHARE in the
                Boardroom to earn more GEM!
                </p> */}
              </p>
              <p>
                <IconTelegram alt="telegram" style={{fill: '#dddfee', height: '15px'}} /> Join our{' '}
                <a
                  href="https://t.me/gemstonfin"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{color: '#f9a43b'}}
                >
                  Telegram
                </a>{' '}
                to find out more!
              </p>
            </Box>
          </Paper>
        </Grid>

        {/* <Grid container spacing={3}>
          <Grid item xs={12} sm={12} justify="center" style={{ margin: '12px', display: 'flex' }}>

            <Alert variant="filled" severity="warning">
              Board<br />
              <b>Please unstake all GSHARE for now. Timer to withdraw will be removed shortly. </b><br />We are very sorry for the inconvenience.

            </Alert>

          </Grid>
        </Grid> */}

        {/* TVL */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center">
              <h2>Total Value Locked</h2>
              <CountUp style={{fontSize: '25px'}} end={TVL} separator="," prefix="$" />
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <Card style={{height: '100%'}}>
            <CardContent align="center" style={{marginTop: '2.5%'}}>
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
              <Button href="/boardroom" className="shinyButton" style={{margin: '10px'}}>
                Stake Now
              </Button>
              <Button href="/farm" className="shinyButton" style={{margin: '10px'}}>
                Farm Now
              </Button>
              <Button
                target="_blank"
                href={buyGemAddress}
                style={{margin: '10px'}}
                className={'shinyButton ' + classes.button}
              >
                Buy GEM
              </Button>
              <Button
                target="_blank"
                href={buyGShareAddress}
                className={'shinyButton ' + classes.button}
                style={{margin: '10px'}}
              >
                Buy GSHARE
              </Button>
              {/* <Button
                target="_blank"
                href="https://www.youtube.com/watch?v=rqzoyNXcRsA"
                className={'shinyButton ' + classes.button}
                style={{marginLeft: '10px'}}
              >
                Tutorial
              </Button> */}
            </CardContent>
          </Card>
        </Grid>

        {/* GEM */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{position: 'relative'}}>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="GEM" />
                </CardIcon>
              </Box>
              <Button
                onClick={() => {
                  gemFinance.watchAssetInMetamask('GEM');
                }}
                style={{position: 'absolute', top: '10px', right: '10px', border: '1px grey solid'}}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{width: '20px', filter: 'grayscale(100%)'}} src={MetamaskFox} />
              </Button>
              <h2 style={{marginBottom: '10px'}}>GEM</h2>
              4,000 GEM (1.0 Peg) =
              <Box>
                <span style={{fontSize: '30px', color: 'white'}}>{gemPriceInMATIC ? gemPriceInMATIC : '-.----'} CRO</span>
              </Box>
              <Box>
                <span style={{fontSize: '16px', alignContent: 'flex-start'}}>
                  ${gemPriceInDollars ? roundAndFormatNumber(gemPriceInDollars, 2) : '-.--'} / GEM
                </span>
              </Box>
              <span style={{fontSize: '12px'}}>
                Market Cap: ${roundAndFormatNumber(gemCirculatingSupply * gemPriceInDollars, 2)} <br />
                Circulating Supply: {roundAndFormatNumber(gemCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(gemTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* GSHARE */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{position: 'relative'}}>
              <Button
                onClick={() => {
                  gemFinance.watchAssetInMetamask('GSHARE');
                }}
                style={{position: 'absolute', top: '10px', right: '10px', border: '1px grey solid'}}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{width: '20px', filter: 'grayscale(100%)'}} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="GSHARE" />
                </CardIcon>
              </Box>
              <h2 style={{marginBottom: '10px'}}>GSHARE</h2>
              Current Price
              <Box>
                <span style={{fontSize: '30px', color: 'white'}}>
                  {aSharePriceInMATIC ? aSharePriceInMATIC : '-.----'} MATIC
                </span>
              </Box>
              <Box>
                <span style={{fontSize: '16px'}}>${aSharePriceInDollars ? aSharePriceInDollars : '-.--'} / GSHARE</span>
              </Box>
              <span style={{fontSize: '12px'}}>
                Market Cap: ${roundAndFormatNumber((aShareCirculatingSupply * aSharePriceInDollars).toFixed(2), 2)}{' '}
                <br />
                Circulating Supply: {roundAndFormatNumber(aShareCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(aShareTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* GBOND */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{position: 'relative'}}>
              <Button
                onClick={() => {
                  gemFinance.watchAssetInMetamask('GBOND');
                }}
                style={{position: 'absolute', top: '10px', right: '10px', border: '1px grey solid'}}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{width: '20px', filter: 'grayscale(100%)'}} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="GBOND" />
                </CardIcon>
              </Box>
              <h2 style={{marginBottom: '10px'}}>GBOND</h2>
              1,000 GBOND
              <Box>
                <span style={{fontSize: '30px', color: 'white'}}>
                  {tBondPriceInMATIC ? tBondPriceInMATIC : '-.----'} ETH
                </span>
              </Box>
              <Box>
                <span style={{fontSize: '16px'}}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'} / GBOND</span>
              </Box>
              <span style={{fontSize: '12px'}}>
                Market Cap: ${roundAndFormatNumber((tBondCirculatingSupply * tBondPriceInDollars).toFixed(2), 2)} <br />
                Circulating Supply: {roundAndFormatNumber(tBondCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(tBondTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="GEM-ETH-LP" />
                </CardIcon>
              </Box>
              <h2>GEM-ETH QuickSwap LP</h2>
              <Box mt={2}>
                {/* <Button disabled onClick={onPresentGemZap} className="shinyButtonDisabledSecondary">
                  Zap In
                </Button> */}
              </Box>
              <Box mt={2}>
                <span style={{fontSize: '26px'}}>
                  {gemLPStats?.tokenAmount ? gemLPStats?.tokenAmount : '-.--'} GEM /{' '}
                  {gemLPStats?.ftmAmount ? gemLPStats?.ftmAmount : '-.--'} ETH
                </span>
              </Box>
              <Box>${gemLPStats?.priceOfOne ? gemLPStats.priceOfOne : '-.--'}</Box>
              <span style={{fontSize: '12px'}}>
                Liquidity: ${gemLPStats?.totalLiquidity ? roundAndFormatNumber(gemLPStats.totalLiquidity, 2) : '-.--'}{' '}
                <br />
                Total Supply: {gemLPStats?.totalSupply ? roundAndFormatNumber(gemLPStats.totalSupply, 2) : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="GSHARE-MATIC-LP" />
                </CardIcon>
              </Box>
              <h2>GSHARE-MATIC QuickSwap LP</h2>
              <Box mt={2}>
                {/* <Button disabled onClick={onPresentGshareZap} className="shinyButtonDisabledSecondary">
                  Zap In
                </Button> */}
              </Box>
              <Box mt={2}>
                <span style={{fontSize: '26px'}}>
                  {bshareLPStats?.tokenAmount ? bshareLPStats?.tokenAmount : '-.--'} GSHARE /{' '}
                  {bshareLPStats?.ftmAmount ? bshareLPStats?.ftmAmount : '-.--'} MATIC
                </span>
              </Box>
              <Box>${bshareLPStats?.priceOfOne ? bshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{fontSize: '12px'}}>
                Liquidity: $
                {bshareLPStats?.totalLiquidity ? roundAndFormatNumber(bshareLPStats.totalLiquidity, 2) : '-.--'}
                <br />
                Total Supply: {bshareLPStats?.totalSupply ? roundAndFormatNumber(bshareLPStats.totalSupply, 2) : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
