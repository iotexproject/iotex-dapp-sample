import React from 'react';
import { VStack, StackProps, Box } from '@chakra-ui/react';

export interface MenuListProps extends StackProps {
  name?: string;
  children: React.ReactNode;
}

export const MenuList = ({ children, name, ...restProps }: MenuListProps) => {
  return (
    <Box>
      <Box>{name}</Box>
      <VStack {...restProps}>{children}</VStack>
    </Box>
  );
};
MenuList.displayName = 'MenuList';
