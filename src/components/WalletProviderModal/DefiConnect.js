import Web3 from 'web3'
import { DeFiWeb3Connector } from 'deficonnect'


export const connector = new DeFiWeb3Connector({
  supportedChainIds: [25],
  rpc: { 25: 'https://cronosrpc-1.xstaking.sg/'},
  pollingInterval: 15000,
})
