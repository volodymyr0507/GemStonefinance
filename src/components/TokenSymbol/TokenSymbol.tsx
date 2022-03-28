import React from 'react';

//Graveyard ecosystem logos
import gemLogo from '../../assets/img/gem-logo2.png';
import tShareLogo from '../../assets/img/gshares-final2.png';
import gemLogoPNG from '../../assets/img/gem-final3.png';
import tShareLogoPNG from '../../assets/img/gshares-final2.png';
import tBondLogo from '../../assets/img/gbond.png';

import gemFtmLpLogo from '../../assets/img/gem-eth-lp.png';
import bshareFtmLpLogo from '../../assets/img/gshares-matic-lp.png';

import bnbLogo from '../../assets/img/matic.png';
import btcLogo from '../../assets/img/eth-logo.png';
import usdcLogo from '../../assets/img/USDC.png';
import nachoLogo from '../../assets/img/nacho.png';


const logosBySymbol: {[title: string]: string} = {
  //Real tokens
  //=====================
  GEM: gemLogo,
  GEMPNG: gemLogoPNG,
  GSHAREPNG: tShareLogoPNG,
  GSHARE: tShareLogo,
  GBOND: tBondLogo,
  WMATIC: bnbLogo,
  BOO: bnbLogo,
  SHIBA: bnbLogo,
  ZOO: bnbLogo,
  CAKE: bnbLogo,
  NACHO: nachoLogo,
  SUSD: bnbLogo,
  SETH: btcLogo,
  ETH: btcLogo,
  USDC: usdcLogo,
  SVL: bnbLogo,
  'ETH-MATIC-LP': gemFtmLpLogo,
  'GEM-ETH-LP': gemFtmLpLogo,
  'GSHARE-MATIC-LP': bshareFtmLpLogo,
  'GSHARE-MATIC-APELP': bshareFtmLpLogo,
  'GEM-WMATIC-LP': gemFtmLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({symbol, size = 85}) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  if(symbol === 'GEM-MIM-LP' || symbol === 'GSHARE-WMATIC-LP' ){
    return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={95} height={60} />;
  }else if(symbol === 'USDC' || symbol === 'WMATIC'|| symbol === 'ETH' || symbol === 'NACHO' ){
    return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={65} height={65} />;
  }else
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
