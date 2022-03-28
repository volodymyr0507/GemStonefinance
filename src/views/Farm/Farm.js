import React from 'react';
import {useWallet} from 'use-wallet';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import Bank from '../Bank';

import {Box, Container, Typography, Grid} from '@material-ui/core';

import {Alert} from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import FarmCard from './FarmCard';
import FarmImage from '../../assets/img/farm.png';
import {createGlobalStyle} from 'styled-components';

import useBanks from '../../hooks/useBanks';

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

const Farm = () => {
  const [banks] = useBanks();
  const {path} = useRouteMatch();
  const {account} = useWallet();
  const gsharesActive = Date.now() >= config.gsharesLaunchesAt.getTime();
  const activeBanks = banks.filter((bank) => !bank.finished && (gsharesActive || bank.sectionInUI !== 2));

  return (
    <Switch>
      <Page>
         <Route exact path={path}>
          <BackgroundImage />
          {!!account ? (
            <Container maxWidth="lg">
              {/* <Typography color="textYellow" align="center" variant="h3" gutterBottom>
                Farm
              </Typography> */}

              <Box mt={5}>
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 2).length === 0}>
                  <Typography color="textPrimary" align="center" variant="h4" gutterBottom>
                    Earn GSHARE by staking QuickSwap LP
                  </Typography>
                  <Alert variant="filled" severity="warning">
                   
                      GSHARE Farms starts at Feb 22, 6PM UTC Epoch #1645552800 and will continue running for 370 Days.



                  </Alert>
                  <Grid container spacing={3} style={{marginTop: '20px'}}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 2)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <FarmCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>

                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 1).length === 0}>
                  <Typography color="textPrimary" align="center" variant="h4" gutterBottom style={{marginTop: '20px'}}>
                  Earn GEM by staking QuickSwap LP
                  </Typography>
                  {/* <Alert variant="filled" severity="warning">
                    Please remove funds from all farms which are not active.
                  </Alert> */}
                  <Grid container spacing={3} style={{marginTop: '20px', display: 'flex', alignItems: 'center'}}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 1)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <FarmCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>

                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 0).length === 0}>
                  <Typography color="textPrimary" align="center" variant="h4" gutterBottom style={{marginTop: '20px'}}>
                    Genesis Pools
                  </Typography>
                  <Alert variant="filled" severity="info">
                    Genesis pools Ended !! " Please Remove your Funds"                   </Alert>
                  <Grid container spacing={3} style={{marginTop: '20px'}}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 0)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <FarmCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>
              </Box>
            </Container>
          ) : (
            <UnlockWallet />
          )}
        </Route>
        <Route path={`${path}/:bankId`}>
          <BackgroundImage />
          <Bank />
        </Route>
        {!!account && !gsharesActive && <div style={{marginTop: '2rem'}}><LaunchCountdown deadline={config.gsharesLaunchesAt} description='GENESIS POOL'/></div>}
      </Page>
    </Switch>
  );
};

export default Farm;
