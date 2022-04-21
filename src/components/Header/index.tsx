import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Container, Group, MediaQuery, Text } from '@mantine/core';
import DesktopNav from './DesktopNav';
import { WalletInfo } from '../WalletInfo';

export const index = observer(() => {
  return (
    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      <Box>
        <Box style={{display: 'flex', justifyContent: 'center', minHeight: '58px', alignItems: 'center'}}>
          <Container style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1280px', width: "100%"}}>
            <Box>
              <Text>IoTeX Dapp Sample</Text>
            </Box>

            <Group direction={'row'} align={'center'} spacing={2} position="right">
              <DesktopNav />
            </Group>
          </Container>
        </Box>
        {/* TODO */}
        {/* <WalletInfo /> */}
      </Box>
    </MediaQuery>
  )
})

index.displayName = 'index'
export default index