import React from 'react';
import {
  Box,
  Flex,
  Container,
  Stack,
  useDisclosure,
  IconButton,
  useColorModeValue,
  Icon,
  useColorMode,
  Heading,
  Alert,
  AlertIcon,
  Text,
  AlertDescription,
  CloseButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { IoLanguage, IoMoon, IoSunny } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { DesktopNav } from '@/components/Header/DesktopNav';
import { observer } from 'mobx-react-lite';
import { WalletInfo } from '../WalletInfo';
import { useWeb3React } from '@web3-react/core';
import { getErrorMessage } from '../../lib/web3-react';
import { Button, Avatar, Image } from '@chakra-ui/react';
import { useStore } from '../../store/index';

export const Header = observer(() => {
  const { isOpen: isMobileNavOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { error } = useWeb3React();
  const { lang } = useStore();

  return (
    <Box>
      <Flex
        as={'header'}
        // pos="fixed"
        // top="0"
        // w={'full'}
        minH={'60px'}
        boxShadow={'sm'}
        zIndex="999"
        justify={'center'}
        css={{
          backdropFilter: 'saturate(180%) blur(5px)',
          backgroundColor: useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)')
        }}
      >
        <Container as={Flex} maxW={'7xl'} align={'center'}>
          <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
            <IconButton onClick={onToggle} icon={isMobileNavOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />} variant={'ghost'} size={'sm'} aria-label={'Toggle Navigation'} />
          </Flex>

          <Flex flex={{ base: 1, md: 'auto' }} justify={{ base: 'center', md: 'start' }}>
            <Link to={'/'}>
              <Stack as={'a'} direction={'row'} alignItems={'center'} spacing={{ base: 2, sm: 4 }}>
                <Icon as={Logo} w={{ base: 8 }} h={{ base: 8 }} />
                <Heading as={'h1'} fontSize={'xl'} display={{ base: 'none', md: 'block' }}>
                  Dapp {lang.t('sample')} V2
                </Heading>
              </Stack>
            </Link>
          </Flex>

          <Stack direction={'row'} align={'center'} spacing={2} flex={{ base: 1, md: 'auto' }} justify={'flex-end'}>
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
            <Popover variant="hover" closeOnBlur>
              {({ onClose }) => (
                <>
                  <PopoverTrigger>
                    <Button borderRadius="12">
                        <Image src={`/images/${lang.lang}.png`} boxSize="15px"/>
                    </Button>
                    {/*<IconButton borderRadius="12" aria-label={'Toggle Color Mode'} icon={<IoLanguage />} />*/}
                  </PopoverTrigger>
                  <PopoverContent w="40" px="2" py="2">
                    {lang.configs.map((i) => (
                      <Button
                        isActive={i.lang===lang.lang}
                        bg={'none'}
                        key={i.lang}
                        onClick={() => {
                          onClose();
                          lang.setLang(i.lang);
                        }}
                      >
                        <Image src={`/images/${i.lang}.png`} boxSize="15px" />
                        <Text ml="8px" fontSize="sm">
                          {i.name}
                        </Text>
                      </Button>
                    ))}
                  </PopoverContent>
                </>
              )}
            </Popover>
            <IconButton borderRadius="12" aria-label={'Toggle Color Mode'} onClick={toggleColorMode} icon={colorMode == 'light' ? <IoMoon size={18} /> : <IoSunny size={18} />} />
          </Stack>
        </Container>
      </Flex>
      <Container maxW={'7xl'} size="">
        {error && (
          <Alert status="error" align={'center'}>
            <AlertIcon />
            <AlertDescription>{getErrorMessage(error)}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        )}
      </Container>
      <WalletInfo />
    </Box>
  );
});
