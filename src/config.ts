import {ChainId} from '@madmeerkat/sdk';
import {Configuration} from './gem-finance/config';
import {BankInfo} from './gem-finance';

const configurations: {[env: string]: Configuration} = {
  // development: {
  //   chainId: 97,
  //   networkName: 'CRONOS Testnet',
  //   ftmscanUrl: 'https://rpc-mumbai.maticvigil.com/',
  //   defaultProvider: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  //   deployments: require('./gem-finance/deployments/deployments.testing.json'),
  //   externalTokens: {
  //     WMATIC: ['0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', 18],
  //     FUSDT: ['0x55d398326f99059fF775485246999027B3197955', 18], // This is actually BUSD on mainnet not fusdt
  //     ETH: ['0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378', 18],
  //     ZOO: ['0x09e145a1d53c0045f41aeef25d8ff982ae74dd56', 0],
  //     SHIBA: ['0x9ba3e4f84a34df4e08c112e1a0ff148b81655615', 9],
  //     'USDT-MATIC-LP': ['0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827', 18],
  //     'GEM-ETH-LP': ['0x497D4b031d1A7fB76B75C99Ad0F9c86DbA7657Fb', 18],
  //     'GSHARE-MATIC-LP': ['0xa90ccF2E01Be627ef0Ac1533d482E182D56ebe32', 18],
  //   },
  //   baseLaunchDate: new Date('2021-11-21 1:00:00Z'),
  //   bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
  //   boardroomLaunchesAt: new Date('2020-12-11T00:00:00Z'),
  //   refreshInterval: 10000,
  // },
  development: {
    chainId: 25,
    networkName: 'CRONOS Mainnet',
    ftmscanUrl: 'https://cronoscan.com/',
    defaultProvider: 'https://rpc.cronaswap.org',
    deployments: require('./gem-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WMATIC: ['0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23', 18],
      FUSDT: ['0xc21223249CA28397B4B6541dfFaEcC539BfF0c59', 9], // This is actually BUSD on mainnet not fusdt USDT
      ETH: ['0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23', 18],
      USDC: ['0xc21223249CA28397B4B6541dfFaEcC539BfF0c59', 6],
      CAKE: ['0x831753DD7087CaC61aB5644b308642cc1c33Dc13', 18],
      ZOO: ['0x09e145a1d53c0045f41aeef25d8ff982ae74dd56', 0],
      NACHO: ['0xcD86152047e800d67BDf00A4c635A8B6C0e5C4c2', 18],
      SHIBA: ['0x9ba3e4f84a34df4e08c112e1a0ff148b81655615', 9],
      'USDT-MATIC-LP': ['0xa68466208F1A3Eb21650320D2520ee8eBA5ba623', 18], //usdt-bnb USDC_WMATIC
      'USDT-ETH-LP': ['0xa68466208F1A3Eb21650320D2520ee8eBA5ba623', 18], //eth-usdt 
      'GEM-ETH-LP': ['0x2C4941241AbE4e2DE0eCbC6e0743975e52Fb5442', 18],
      'GEM-MATIC-LP': ['0xB6E85031F313563bF12ea414118978C8BD78db5D', 18],
      'GSHARE-MATIC-LP': ['0x6fd6D9507a683Af7509302a0444251B9630Dd6e1', 18],
      // 'GSHARE-MATIC-APELP': ['0x0dE2a71b2f43CF588A00422d41E1C02D0E08D552', 18],
      // 'GEM-WMATIC-LP': ['0xB6E85031F313563bF12ea414118978C8BD78db5D', 18],
    },
    baseLaunchDate: new Date('2022-02-07T03:00:00Z'),
    bondLaunchesAt: new Date('2022-02-20T03:00:00Z'),
    boardroomLaunchesAt: new Date('2022-02-02T06:00:00Z'),
    gsharesLaunchesAt: new Date('2022-02-10T12:00:00Z'),
    refreshInterval: 10000,
  },
  production: {
    chainId: 25,
    networkName: 'CRONOS Mainnet',
    ftmscanUrl: 'https://cronoscan.com/',
    defaultProvider: 'https://rpc.cronaswap.org',
    deployments: require('./gem-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WMATIC: ['0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23', 18], //wmatic
      FUSDT: ['0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', 9], // This is actually BUSD on mainnet not fusdt
      ETH: ['0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23', 18],
      USDC: ['0xc21223249CA28397B4B6541dfFaEcC539BfF0c59', 6],
      CAKE: ['0x831753DD7087CaC61aB5644b308642cc1c33Dc13', 18], //quick
      ZOO: ['0x09e145a1d53c0045f41aeef25d8ff982ae74dd56', 0],
      NACHO: ['0xcD86152047e800d67BDf00A4c635A8B6C0e5C4c2', 18],
      SHIBA: ['0x9ba3e4f84a34df4e08c112e1a0ff148b81655615', 9],
      'USDT-MATIC-LP': ['0xa68466208F1A3Eb21650320D2520ee8eBA5ba623', 18], //wmatic-USDT
      'USDT-ETH-LP': ['0xa68466208F1A3Eb21650320D2520ee8eBA5ba623', 18],
      'GEM-ETH-LP': ['0x2C4941241AbE4e2DE0eCbC6e0743975e52Fb5442', 18],
      'GEM-MATIC-LP': ['0xB6E85031F313563bF12ea414118978C8BD78db5D', 18], //gem-wmatic
      'GSHARE-MATIC-LP': ['0x6fd6D9507a683Af7509302a0444251B9630Dd6e1', 18], //gshare-wmatic
      // 'GSHARE-MATIC-APELP': ['0x0dE2a71b2f43CF588A00422d41E1C02D0E08D552', 18],
      // 'GEM-WMATIC-LP': ['0xB6E85031F313563bF12ea414118978C8BD78db5D', 18],
    },
    baseLaunchDate: new Date('2022-02-07T03:00:00Z'),
    bondLaunchesAt: new Date('2022-02-02T03:00:00Z'),
    boardroomLaunchesAt: new Date('2022-02-02T06:00:00Z'),
    gsharesLaunchesAt: new Date('2022-02-10T12:00:00Z'),
    refreshInterval: 10000,
  },
};

export const bankDefinitions: {[contractName: string]: BankInfo} = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding GEM
        - 2 = LP asset staking rewarding GSHARE
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  // GemETHApeLPGemRewardPool: {
  //   name: 'Earn GEM by GEM-ETH Ape LP',
  //   poolId: 2,
  //   sectionInUI: 1,
  //   contract: 'GemETHApeLPGemRewardPool',
  //   depositTokenName: 'GEM-WMATIC-LP',
  //   earnTokenName: 'GEM',
  //   finished: true,
  //   sort: 2,
  //   closedForStaking: true,
  // },



  // GemETHLPGemRewardPool: {
  //   name: 'Earn GEM by GEM-ETH LP',
  //   poolId: 0,
  //   sectionInUI: 1,
  //   contract: 'GemRewardPool',
  //   depositTokenName: 'GEM-ETH-LP',
  //   earnTokenName: 'GEM',
  //   finished: false,
  //   sort: 2,
  //   closedForStaking: false,
  // },


  
  // GemCakeRewardPool: {
  //   name: 'Earn GEM by CAKE',
  //   poolId: 0,
  //   sectionInUI: 0,
  //   contract: 'GemCAKERewardPool',
  //   depositTokenName: 'CAKE',
  //   earnTokenName: 'GEM',
  //   finished: true,
  //   sort: 3,
  //   closedForStaking: true,
  // },
  // GemSETHRewardPool: {
  //   name: 'Earn GEM by SETH',
  //   poolId: 2,
  //   sectionInUI: 0,
  //   contract: 'GemSETHRewardPool',
  //   depositTokenName: 'SETH',
  //   earnTokenName: 'GEM',
  //   finished: true,
  //   sort: 4,
  //   closedForStaking: true,
  // },
  // GemSUSDRewardPool: {
  //   name: 'Earn GEM by SUSD',
  //   poolId: 1,
  //   sectionInUI: 0,
  //   contract: 'GemSUSDRewardPool',
  //   depositTokenName: 'SUSD',
  //   earnTokenName: 'GEM',
  //   finished: true,
  //   sort: 5,
  //   closedForStaking: true,
  // },
  // GemSVLRewardPool: {
  //   name: 'Earn GEM by SVL',
  //   poolId: 3,
  //   sectionInUI: 0,
  //   contract: 'GemSVLRewardPool',
  //   depositTokenName: 'SVL',
  //   earnTokenName: 'GEM',
  //   finished: true,
  //   sort: 6,
  //   closedForStaking: true,
  // },

  // GemGenesisRewardPool: {
  //   name: 'Earn GEM by ETH',
  //   poolId: 2,
  //   sectionInUI: 0,
  //   contract: 'GemGenesisRewardPool',
  //   depositTokenName: 'ETH',
  //   earnTokenName: 'GEM',
  //   finished: false,
  //   sort: 3,
  //   closedForStaking: false,
  // },
  GemWMATICGenesisRewardPool: {
    name: 'Earn GEM by MATIC',
    poolId: 1,
    sectionInUI: 0,
    contract: 'GemWMATICGenesisRewardPool',
    depositTokenName: 'WMATIC',
    earnTokenName: 'GEM',
    finished: false,
    sort: 1,
    closedForStaking: false,
  },
  GemUSDCGenesisRewardPool: {
    name: 'Earn GEM by USDC',
    poolId: 0,
    sectionInUI: 0,
    contract: 'GemUSDCGenesisRewardPool',
    depositTokenName: 'USDC',
    earnTokenName: 'GEM',
    finished: false,
    sort: 2,
    closedForStaking: false,
  },
  // GemNACHOGenesisRewardPool: {
  //   name: 'Earn GEM by NACHO',
  //   poolId: 3,
  //   sectionInUI: 0,
  //   contract: 'GemNACHOGenesisRewardPool',
  //   depositTokenName: 'NACHO',
  //   earnTokenName: 'GEM',
  //   finished: false,
  //   sort: 4,
  //   closedForStaking: false,
  // },
  // GemWMATICGenesisRewardPool: {
  //   name: 'Earn GEM by WMATIC',
  //   poolId: 4,
  //   sectionInUI: 0,
  //   contract: 'GemWMATICGenesisRewardPool',
  //   depositTokenName: 'WMATIC',
  //   earnTokenName: 'GEM',
  //   finished: true,
  //   sort: 1,
  //   closedForStaking: true,
  // },
  // GemBnbLPRewardPool: {
  //   name: 'Earn GEM by GEM-MATIC LP',
  //   poolId: 1,
  //   sectionInUI: 1,
  //   contract: 'GemBnbLPRewardPool',
  //   depositTokenName: 'GEM-MATIC-LP',
  //   earnTokenName: 'GEM',
  //   finished: false,
  //   sort: 8,
  //   closedForStaking: false,
  // },
  // GemShibaRewardPool: {
  //   name: 'Earn GEM by SHIBA',
  //   poolId: 2,
  //   sectionInUI: 0,
  //   contract: 'GemShibaGenesisRewardPool',
  //   depositTokenName: 'SHIBA',
  //   earnTokenName: 'GEM',
  //   finished: false,
  //   sort: 3,
  //   closedForStaking: true,
  // },
  // GemZooRewardPool: {
  //   name: 'Earn GEM by ZOO',
  //   poolId: 3,
  //   sectionInUI: 0,
  //   contract: 'GemZooGenesisRewardPool',
  //   depositTokenName: 'ZOO',
  //   earnTokenName: 'GEM',
  //   finished: false,
  //   sort: 4,
  //   closedForStaking: true,
  // },

  // GemFtmLPGemRewardPoolOld: {
  //   name: 'Earn GEM by GEM-MATIC LP',
  //   poolId: 0,
  //   sectionInUI: 1,
  //   contract: 'GemFtmLpGemRewardPoolOld',
  //   depositTokenName: 'GEM-MATIC-LP',
  //   earnTokenName: 'GEM',
  //   finished: true,
  //   sort: 9,
  //   closedForStaking: true,
  // },
  // GemFtmLPGShareRewardPool: {
  //   name: 'Earn GSHARE by GEM-MATIC LP',
  //   poolId: 0,
  //   sectionInUI: 2,
  //   contract: 'GemFtmLPGShareRewardPool',
  //   depositTokenName: 'GEM-MATIC-LP',
  //   earnTokenName: 'GSHARE',
  //   finished: false,
  //   sort: 6,
  //   closedForStaking: false,
  // },



  // GShareBnbGShareRewardPool: {
  //   name: 'Earn GSHARE by GSHARE-MATIC LP',
  //   poolId: 0,
  //   sectionInUI: 2,
  //   contract: 'GShareBnbGShareRewardPool',
  //   depositTokenName: 'GSHARE-MATIC-LP',
  //   earnTokenName: 'GSHARE',
  //   finished: false,
  //   sort: 7,
  //   closedForStaking: false,
  // },
  // GemEthGShareRewardPool: {
  //   name: 'Earn GSHARE by GEM-ETH LP',
  //   poolId: 0,
  //   sectionInUI: 2,
  //   contract: 'GemEthGShareRewardPool',
  //   depositTokenName: 'GEM-ETH-LP',
  //   earnTokenName: 'GSHARE',
  //   finished: false,
  //   sort: 0,
  //   closedForStaking: false,
  // },



  // GemEthLPApeGShareRewardPool: {
  //   name: 'Earn GSHARE by GEM-ETH LP',
  //   poolId: 3,
  //   sectionInUI: 2,
  //   contract: 'GemEthLPApeGShareRewardPool',
  //   depositTokenName: 'GEM-ETH-LP',
  //   earnTokenName: 'GSHARE',
  //   finished: false,
  //   sort: 7,
  //   closedForStaking: false,
  // },
  // GshareBnbApeLPGShareRewardPool: {
  //   name: 'Earn GSHARE by GSHARE-MATIC Ape LP',
  //   poolId: 2,
  //   sectionInUI: 1,
  //   contract: 'GshareBnbApeLPGShareRewardPool',
  //   depositTokenName: 'GSHARE-MATIC-APELP',
  //   earnTokenName: 'GSHARE',
  //   finished: true,
  //   sort: 5,
  //   closedForStaking: true,
  // },
  // GemEthApeLPGShareRewardPool: {
  //   name: 'Earn GSHARE by GEM-ETH Ape LP',
  //   poolId: 3,
  //   sectionInUI: 2,
  //   contract: 'GemEthApeLPGShareRewardPool',
  //   depositTokenName: 'GEM-WMATIC-LP',
  //   earnTokenName: 'GSHARE',
  //   finished: true,
  //   sort: 4,
  //   closedForStaking: true,
  // },
  // GsharematicLPGShareRewardPool: {
  //   name: 'Earn GSHARE by GSHARE-MATIC LP',
  //   poolId: 1,
  //   sectionInUI: 2,
  //   contract: 'GsharematicLPGShareRewardPool',
  //   depositTokenName: 'GSHARE-MATIC-LP',
  //   earnTokenName: 'GSHARE',
  //   finished: false,
  //   sort: 2,
  //   closedForStaking: false,
  // },
  // GemEthLPGShareRewardPool: {
  //   name: 'Earn GSHARE by GEM-ETH LP',
  //   poolId: 0,
  //   sectionInUI: 2,
  //   contract: 'GemEthLPGShareRewardPool',
  //   depositTokenName: 'GEM-ETH-LP',
  //   earnTokenName: 'GSHARE',
  //   finished: false,
  //   sort: 1,
  //   closedForStaking: false,
  // },
};

export default configurations[process.env.NODE_ENV || 'development'];
