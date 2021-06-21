import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { useCallback, useContext, useMemo } from 'react';
import { MenuContext } from './Context'

interface ExtraData extends Record<string, any>{
    key: string;
}

export interface MenuItemProps extends BoxProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  extraData: ExtraData;
  onSelect?: (selectKey: string, extraData?: ExtraData) => void;
}

export const MenuItem = ({ children, icon, onSelect, extraData, ...restPorps }: MenuItemProps) => {
  const context = useContext(MenuContext)
  const { selectedKeys } = context
  const { key }  = extraData
  const isSelected = useMemo(() => selectedKeys?.includes(key), [selectedKeys])
  const handleClick = useCallback(() => {
    onSelect?.(key, extraData)
    context.onSelect(key, extraData)
  }, [onSelect])

  return (
    <Box w="100%" bg={isSelected ? 'blue.50' : ''}  color={isSelected ? 'blue.400' : ''} cursor="pointer" {...restPorps} onClick={handleClick}>
      {icon && <Box>{icon}</Box>}
      {children}
    </Box>
  );
};

MenuItem.displayName = 'MenuItem';
