import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Container, LinkBox, SimpleGrid, Heading, LinkOverlay, Stack, Alert, Image, Link } from '@chakra-ui/react';
import { ToolConfig } from '../../config/ToolConfig';
import { Badge, Flex, Text } from '@chakra-ui/layout';

export const Home = observer(() => {

  const links = [
    { text: 'GitHub |', url: 'https://github.com/iotexproject/iotex-dapp-sample-v2' },
    { text: 'Issues |', url: 'https://github.com/iotexproject/iotex-dapp-sample-v2/issues' },
    { text: 'Use template', url: 'https://github.com/iotexproject/iotex-dapp-sample-v2/generate' }
  ];

  return (
    <Container maxW='7xl'>
      <Flex justifyContent={'center'} alignItems={'center'} mt={10} flexDirection={'column'}>
        <Image src={'images/v2.png'} w={'100%'} />
        <Text mt={5}>
          IoTeX Dapp Sample V2
        </Text>
        <Flex mt={5}>
          {
            links.map(link => {
              return (
                <Link href={link.url} isExternal key={link.text} ml={2} _first={{ml:0}}  _hover={{}}>
                  <Text>
                    {link.text}
                  </Text>
                </Link>
              );
            })
          }
        </Flex>
      </Flex>
      <SimpleGrid minChildWidth='200px' spacing='10px' py='6'>
        {ToolConfig.map((i) => (
          <LinkBox as='article' w='200px' p='4' borderWidth='1px' rounded='md' key={i.name}>
            <LinkOverlay href={i.path} target='__blank'>
              <Text>{i.name}</Text>
            </LinkOverlay>
            {i.tags && (
              <Stack direction='row' mt='2'>
                {i.tags.map((i) => (
                  <Badge key={i} variant='outline' colorScheme='green'>
                    {i}
                  </Badge>
                ))}
              </Stack>
            )}
          </LinkBox>
        ))}
      </SimpleGrid>
    </Container>
  );
});
