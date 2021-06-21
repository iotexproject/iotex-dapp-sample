import React from 'react'

export interface MenuContextType {
    selectedKeys: string[];
    onSelect: (selectedKey: string, extraData: Record<string, any>) => void
}

export const MenuContext = React.createContext<MenuContextType>(null)