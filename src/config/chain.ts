import { publicConfig } from './public';

export type NetworkObject = {
  name: string;
  chainId: number;
  rpcUrl: string;
  logoUrl: string;
  explorerUrl: string;
  explorerName: string;
  nativeCoin: string;
  // blockPerSeconds: number;
  // multicallAddr: string;
  type: 'mainnet' | 'testnet';
};

export const defaultNetworks: NetworkObject[] = [
  {
    name: 'ETH',
    chainId: 1,
    rpcUrl: `https://www.ankr.com/rpc/eth`,
    logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/eth.svg',
    explorerUrl: 'https://etherscan.io',
    explorerName: 'EtherScan',
    nativeCoin: 'ETH',
    type: 'mainnet'
  },
  {
    name: 'Polygon',
    chainId: 137,
    logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/matic.svg',
    rpcUrl: 'https://www.ankr.com/rpc/polygon',
    explorerUrl: 'https://explorer-mainnet.maticvigil.com/',
    explorerName: 'PolygonScan',
    nativeCoin: 'MATIC',
    type: 'mainnet'
  },
  {
    name: 'BSC',
    chainId: 56,
    rpcUrl: 'https://www.ankr.com/rpc/bsc',
    logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/bnb.svg',
    explorerUrl: 'https://bscscan.com',
    explorerName: 'BscScan',
    nativeCoin: 'BNB',
    type: 'mainnet'
  },
  {
    name: 'IoTeX',
    chainId: 4689,
    rpcUrl: 'https://babel-api.mainnet.iotex.io/',
    logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/iotx.svg',
    explorerUrl: 'https://iotexscan.io',
    explorerName: 'IotexScan',
    nativeCoin: 'IOTX',
    type: 'mainnet'
  },
  {
    name: 'Avalanche',
    chainId: 43114,
    rpcUrl: 'https://rpc.ankr.com/avalanche',
    logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/avax.svg',
    explorerUrl: 'https://subnets.avax.network/',
    explorerName: 'AVAXScan',
    nativeCoin: 'AVAX',
    type: 'mainnet'
  },
  {
    name: 'Fantom',
    chainId: 250,
    rpcUrl: 'https://rpc.ankr.com/fantom',
    logoUrl: 'https://cryptologos.cc/logos/fantom-ftm-logo.svg',
    explorerUrl: 'https://ftmscan.com/',
    explorerName: 'FTMScan',
    nativeCoin: 'FTM',
    type: 'mainnet'
  },
  {
    name: 'BSC Testnet',
    chainId: 97,
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/bnb.svg',
    explorerUrl: 'https://testnet.bscscan.com',
    explorerName: 'BscScan',
    nativeCoin: 'BNB',
    type: 'testnet'
  },
  {
    name: 'ETH Kovan',
    chainId: 42,
    rpcUrl: `https://kovan.infura.io/v3/${publicConfig.infuraId}`,
    logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/eth.svg',
    explorerUrl: 'https://kovan.etherscan.io',
    explorerName: 'EtherScan',
    nativeCoin: 'ETH',
    type: 'testnet'
  },
  {
    name: 'ETH Rinkeby',
    chainId: 4,
    rpcUrl: `https://rinkeby.infura.io/v3/${publicConfig.infuraId}`,
    logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/eth.svg',
    explorerUrl: 'https://rinkeby.etherscan.io',
    explorerName: 'EtherScan',
    nativeCoin: 'ETH',
    type: 'testnet'
  },
  {
    name: 'IoTeX Testnet',
    chainId: 4690,
    rpcUrl: `https://babel-api.testnet.iotex.io`,
    logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/iotx.svg',
    explorerUrl: 'https://testnet.iotexscan.io',
    explorerName: 'IotexScan',
    nativeCoin: 'IOTX',
    type: 'testnet'
  }
];
