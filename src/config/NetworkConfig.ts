import { BSCMainnetConfig } from './BSCMainnetConfig';
import { MappingState } from '@/store/standard/MappingState';
import { EthNetworkState } from '../store/lib/EthNetworkState';
import { ETHKovanConfig } from './ETHKovanConfig';
import { ETHMainnetConfig } from './ETHMainnetConfig';
import { BSCTestnetConfig } from './BSCTestnetConfig';
import { IotexMainnetConfig } from './IotexMainnetConfig';
import { IotexTestnetConfig } from './IotexTestnetConfig';
import { PolygonMainnetConfig } from './PolygonMainnetConfig';

export const EthNetworkConfig = new EthNetworkState({
  allowChains: [
    BSCMainnetConfig.chainId,
    BSCTestnetConfig.chainId,
    ETHMainnetConfig.chainId,
    ETHKovanConfig.chainId,
    IotexTestnetConfig.chainId,
    IotexMainnetConfig.chainId,
    PolygonMainnetConfig.chainId
  ],
  info: {
    token: {
      tokenExample: '0x000000000000000000000000000000000000000'
    }
  },
  chain: new MappingState({
    currentId: BSCMainnetConfig.chainId,
    map: {
      [ETHMainnetConfig.chainId]: ETHMainnetConfig,
      [ETHKovanConfig.chainId]: ETHKovanConfig,
      [BSCMainnetConfig.chainId]: BSCMainnetConfig,
      [BSCTestnetConfig.chainId]: BSCTestnetConfig,
      [IotexMainnetConfig.chainId]: IotexMainnetConfig,
      [IotexTestnetConfig.chainId]: IotexTestnetConfig,
      [PolygonMainnetConfig.chainId]: PolygonMainnetConfig
    }
  })
});
