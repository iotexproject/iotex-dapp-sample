import React, { useCallback, useMemo, useState } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { MenuContext, MenuContextType } from './Context';
import { useEffect } from 'react';

export interface MenuProps extends BoxProps {
  children: React.ReactNode;
  selectedKeys?: string[];
  onSelectedChange?: (selectedKeys: string[], extraData: Record<string, any>) => void;
}

export const Menu = (props: MenuProps) => {
  const { children, selectedKeys, onSelectedChange, ...restProps } = props;
  const [innerSelectedKeys, setInnerSelectedKeys] = useState(selectedKeys || []);
  const handleSelect = useCallback(
    (selectedKey, extraData) => {
      let changedSelectedKeys = innerSelectedKeys;
      if (!innerSelectedKeys.includes(selectedKey)) {
        changedSelectedKeys = [selectedKey]
        onSelectedChange?.(changedSelectedKeys, extraData);
        if (selectedKeys === undefined) {
          setInnerSelectedKeys(changedSelectedKeys);
        }
      }
    },
    [innerSelectedKeys, onSelectedChange]
  );
  const providerValue = useMemo<MenuContextType>(
    () => ({
      onSelect: handleSelect,
      selectedKeys: innerSelectedKeys
    }),
    [innerSelectedKeys]
  );

  useEffect(() => {
    setInnerSelectedKeys(selectedKeys);
  }, [selectedKeys]);

  return (
    <Box {...restProps}>
      <MenuContext.Provider value={providerValue}>{children}</MenuContext.Provider>
    </Box>
  );
};

Menu.displayName = 'Menu';
