import React, { useCallback, useEffect, useState } from 'react';
import { Box, Container, Text, Input, Button, Center, Flex, InputGroup } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { utils } from 'ethers';
import toast from 'react-hot-toast';

import { useStore } from '../../store';

export const Transfer = observer(() => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const { god, lang } = useStore();
  useEffect(() => {
    setEnabled(utils.isAddress(address) && Number(amount) >= 0);
  }, [address]);
  const onSubmit = useCallback(async () => {
    const signer = god.eth.signer;
    const value = utils.parseEther(amount);

    try {
      setLoading(true);
      const raw = await signer.sendTransaction({
        to: address,
        value
      });
      if (raw.hash) {
        toast.success('Transfer Succeeded');
      }
      setAddress("")
    } finally {
      setLoading(false);
    }
  }, [amount]);
  return (
    <Container maxW="md" mt={20}>
      <Box>
        <Box border="1px solid" borderRadius="md" borderColor="inherit" mt={4}>
          <Flex justify="space-between" p={2}>
            <Text fontSize="sm">{lang.t('receiver.address')}</Text>
          </Flex>
          <InputGroup>
            <Input border="none" placeholder={god.currentNetwork.info.token.tokenExample} value={address} onChange={(e) => setAddress(e.target.value)} />
          </InputGroup>
        </Box>
        <Box border="1px solid" borderRadius="md" borderColor="inherit" mt={4}>
          <Flex justify="space-between" p={2}>
            <Text fontSize="sm">{lang.t('amount')}</Text>
          </Flex>
          <InputGroup>
            <Input border="none" placeholder={'0'} value={amount} onChange={(e) => setAmount(e.target.value)} />
          </InputGroup>
        </Box>
        <Center mt="4">
          <Button type="submit" px="20" disabled={!enabled} onClick={onSubmit} isLoading={loading}>
            Submit
          </Button>
        </Center>
      </Box>
    </Container>
  );
});
