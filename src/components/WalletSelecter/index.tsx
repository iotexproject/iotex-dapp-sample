import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect } from '../../lib/web3-react';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { Box, Flex, Text, HStack, VStack } from '@chakra-ui/layout';
import {
  Image,
  Button,
  Img,
  Avatar,
  AvatarBadge,
  createStandaloneToast,
  Center,
  Divider,
  AvatarGroup,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { BSCMainnetConfig } from '../../config/BSCMainnetConfig';
import { ETHMainnetConfig } from '../../config/ETHMainnetConfig';
import { metamaskUtils } from '../../lib/metaskUtils';
import { useEffect } from 'react';
import { Network } from '@/store/god';
import { IotexMainnetConfig } from '../../config/IotexMainnetConfig';
import { PolygonMainnetConfig } from '../../config/PolygonMainnetConfig';

const toast = createStandaloneToast();

export const WalletSelecter = observer(() => {
  const { god } = useStore();
  const { active, error, activate } = useWeb3React();

  const store = useLocalStore(() => ({
    get visible() {
      return god.eth.connector.showConnector;
    },
    get networks() {
      return [ETHMainnetConfig, BSCMainnetConfig, IotexMainnetConfig, PolygonMainnetConfig];
    },
    close() {
      god.eth.connector.showConnector = false;
    },
    async setChain(val) {
      const chain = god.currentNetwork.chain.map[val];
      console.log(chain);
      await metamaskUtils.setupNetwork({
        chainId: chain.chainId,
        blockExplorerUrls: [chain.explorerURL],
        chainName: chain.name,
        nativeCurrency: {
          decimals: chain.Coin.decimals || 18,
          name: chain.Coin.symbol,
          symbol: chain.Coin.symbol
        },
        rpcUrls: [chain.rpcUrl]
      });
      god.setChain(val);
    },
    connectInejct() {
      god.setNetwork(Network.ETH);
      activate(injected);
      god.eth.connector.latestProvider.save('inject');
    },
    onWalletConnect() {
      god.setNetwork(Network.ETH);
      activate(walletconnect);
      god.eth.connector.latestProvider.save('walletConnect');
    }
  }));

  useEffect(() => {
    //@ts-ignore
    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error) {
      const handleChainChanged = () => {
        store.connectInejct();
      };
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          store.connectInejct();
        }
      };
      ethereum.on('networkChanged', handleChainChanged);
      ethereum.on('close', handleChainChanged);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('networkChanged', handleChainChanged);
          ethereum.removeListener('close', handleChainChanged);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, [active, error, activate]);

  const config = [
    {
      title: 'Metamask',
      icon: '/images/metamask.svg'
    },
    {
      title: 'ioPay',
      icon: '/images/iopay.svg'
    },
    {
      title: 'Trust',
      icon: '/images/trustwallet.svg'
    },
    {
      title: 'Math',
      icon: '/images/mathwallet.svg'
    },
    {
      title: 'imToken',
      icon: '/images/imtoken.svg'
    }
  ];
  const names = config.map((item) => item.title).join(', ');
  const bW = useColorModeValue('3px', '1px');

  return (
    <Modal isOpen={store.visible} onClose={store.close} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="15px" bgGradient={god.currentChain.info.theme.bgGradient}>
        <ModalHeader bg={useColorModeValue('white', 'gray.800')} borderTopRadius="15px" margin={`${bW}  ${bW}  0 ${bW} `}>
          <Text fontSize="xl" fontWeight="bold">
            {god.isConnect ? 'Switch Network' : 'Connect to a wallet'}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py="6" bg={useColorModeValue('white', 'gray.800')} borderBottomRadius="15px" margin={`0 ${bW}  ${bW}   ${bW} `}>
          <HStack justify="space-between" mb={6} px={4}>
            {store.networks.map((i) => (
              <Box display="flex" flexDirection="column" alignItems="center" key={i.chainId}>
                <Avatar src={i.logoUrl} cursor="pointer" bg="transparent" size="md" onClick={() => store.setChain(i.chainId)}>
                  {god.currentChain.networkKey == i.networkKey && <AvatarBadge boxSize="1em" bg="green.500" />}
                </Avatar>
                <Text fontSize="xs" mt={1}>
                  {i.name}
                </Text>
              </Box>
            ))}
          </HStack>
          {!god.currentNetwork.account && (
            <Box>
              <Divider />
              <Box onClick={store.connectInejct} my="12px" style={{ cursor: 'pointer' }} borderRadius="8px" padding="14px" mt="24px" bg="rgba(0,0,0,0.1)">
                <Flex>
                  <Flex direction="column">
                    <Text fontSize="20" lineHeight="26.38px" fontStyle="normal" fontWeight="500">
                      Broswer Wallet
                    </Text>
                    <Text mt="3px" color="gray.500" variant="blue" fontSize="12" lineHeight="16.38px" fontStyle="normal" fontWeight="500">
                      ({names})
                    </Text>
                  </Flex>
                  <Flex ml="2px">
                    <AvatarGroup size="sm" border="none">
                      {config.map((item, index) => {
                        return <Avatar name={item.title} key={item.title} src={item.icon} />;
                      })}
                    </AvatarGroup>
                  </Flex>
                </Flex>
              </Box>
              <Box onClick={() => store.onWalletConnect()} my="12px" style={{ cursor: 'pointer' }} borderRadius="8px" padding="14px" background="rgba(0,0,0,0.1)">
                <Flex justifyContent="space-between" alignItems="center">
                  <Flex direction="column">
                    <Text fontSize="18" lineHeight="26.38px" fontStyle="normal" fontWeight="500">
                      Wallet Connect
                    </Text>
                  </Flex>
                  <Flex ml="2px">
                    <AvatarGroup size="sm" border="none">
                      <Avatar src={'/images/walletConnect.svg'} />
                    </AvatarGroup>
                  </Flex>
                </Flex>
              </Box>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
