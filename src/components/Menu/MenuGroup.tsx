import React from 'react';
import { Box, VStack, StackProps } from '@chakra-ui/react';

export interface MenuGroupProps extends StackProps {
  children: React.ReactNode;
  name: string;
}

export const MenuGroup = ({ children, name, ...restProps }: MenuGroupProps) => {
  return (
    <Box>
      <Box>{name}</Box>
      <VStack {...restProps}>{children}</VStack>
    </Box>
  );
};

MenuGroup.displayName = 'MenuGroup';
