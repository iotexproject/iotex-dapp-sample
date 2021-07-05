import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Container, LinkBox, SimpleGrid, Heading, LinkOverlay, Stack, Alert } from '@chakra-ui/react';
import { ToolConfig } from '../../config/ToolConfig';
import { Badge, Text } from '@chakra-ui/layout';

export const Home = observer(() => {
  return (
    <Container maxW="7xl">
      <SimpleGrid minChildWidth="200px" spacing="10px" py="6">
        {ToolConfig.map((i) => (
          <LinkBox as="article" w="200px" p="4" borderWidth="1px" rounded="md" key={i.name}>
            <LinkOverlay href={i.path} target="__blank">
              <Text>{i.name}</Text>
            </LinkOverlay>
            {i.tags && (
              <Stack direction="row" mt="2">
                {i.tags.map((i) => (
                  <Badge key={i} variant="outline" colorScheme="green">
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
