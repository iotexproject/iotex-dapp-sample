import { Box, useRadio, useRadioGroup, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text, Button, Stack, Input, InputRightAddon, InputGroup } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

type SettingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSlippageChange?: (value: string) => void;
  slippageValue?: string
};

function SlippageRadioOption(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        height="10"
        px="2"
        minW="10"
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        {props.children}
      </Box>
    </Box>
  )
}

function SlippageRadio({ onSlippageChange, slippageValue }: Pick<SettingModalProps, 'onSlippageChange' | 'slippageValue'>) {
  const options = ['0.1', '0.5', '1']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'slippage',
    defaultValue: '0.5',
    value: slippageValue,
    onChange: onSlippageChange,
  })

  const group = getRootProps()

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <SlippageRadioOption key={value} {...radio}>
            {value}%
          </SlippageRadioOption>
        )
      })}
    </HStack>
  )
}


export const SettingModal = observer((props: SettingModalProps) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" mb="4">Slippage Tolerance</Text>
          <Stack direction="row" spacing="2">
            <SlippageRadio onSlippageChange={props.onSlippageChange} slippageValue={props.slippageValue}></SlippageRadio>
            <InputGroup>
              <Input w="20"></Input>
              <InputRightAddon>%</InputRightAddon>
            </InputGroup>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
