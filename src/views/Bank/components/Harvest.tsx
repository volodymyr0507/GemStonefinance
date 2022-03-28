import React, {useMemo} from 'react';
import styled from 'styled-components';

import {Button, Card, CardContent, Typography} from '@material-ui/core';
// import Button from '../../../components/Button';
// import Card from '../../../components/Card';
// import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import Value from '../../../components/Value';
import useEarnings from '../../../hooks/useEarnings';
import useHarvest from '../../../hooks/useHarvest';

import {getDisplayBalance} from '../../../utils/formatBalance';
import TokenSymbol from '../../../components/TokenSymbol';
import {Bank} from '../../../gem-finance';
import useGemStats from '../../../hooks/useGemStats';
import useShareStats from '../../../hooks/useGShareStats';

interface HarvestProps {
  bank: Bank;
}

const Harvest: React.FC<HarvestProps> = ({bank}) => {
  const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
  const {onReward} = useHarvest(bank);
  const gemStats = useGemStats();
  const tShareStats = useShareStats();

  const tokenName = bank.earnTokenName === 'GSHARE' ? 'GSHARE' : 'GEM';
  const tokenStats = bank.earnTokenName === 'GSHARE' ? tShareStats : gemStats;
  const tokenPriceInDollars = useMemo(
    () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
    [tokenStats],
  );
  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);
  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol={bank.earnToken.symbol} />
            </CardIcon>
            <Value value={getDisplayBalance(earnings)} />
                          <Typography style={{textTransform: 'uppercase', color: '#fffff'}}>
                      {`≈ $${earnedInDollars}`}
                    </Typography>
            {/* <Label text={`≈ $${earnedInDollars}`} /> */}
                  <Typography style={{textTransform: 'uppercase', color: '#155aca'}}>
              {`${tokenName} Earned`}
                    </Typography>
             {/* <Label text={`${tokenName} Earned`} /> */}
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              onClick={onReward}
              disabled={earnings.eq(0)}
              className={earnings.eq(0) ? 'shinyButtonDisabled' : 'shinyButton'}
            >
              Claim
            </Button>
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Harvest;
