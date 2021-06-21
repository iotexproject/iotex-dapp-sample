import React, { useMemo } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Menu, MenuItem, MenuGroup, MenuList } from '@/components/Menu';
import { MenuDataType } from '@/config/MenuConfig'
import { useStore } from '@/store/index';

interface SideBarProps extends BoxProps {
}

const menuTreeRender = (dataSource: MenuDataType[]) => {
  return dataSource.map((item) => {
    const { type, name, key, children = [], extraData } = item;
    if (type === 'group') {
      return (
        <MenuGroup key={key} name={name}>
          {menuTreeRender(children)}
        </MenuGroup>
      );
    } else if (type === 'list') {
      return (
        <MenuList name={name} key={key}>
          {menuTreeRender(children)}
        </MenuList>
      );
    } else {
      return <MenuItem extraData={{key, ...extraData}}>{item.name}</MenuItem>;
    }
  });
};

export const SideBar = observer((props: SideBarProps) => {
  const { menu: { sideMenus } } = useStore()
  const menuRenderResult = useMemo(() => menuTreeRender(sideMenus), [sideMenus]);
  return (
    <Box {...props}>
      <Menu>{menuRenderResult}</Menu>
    </Box>
  );
});
SideBar.displayName = 'SideBar';
