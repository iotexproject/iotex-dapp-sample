import { makeAutoObservable } from 'mobx';
import { MenuConfig, MenuDataType } from '@/config/MenuConfig'

export class MenuStore {

    sideMenus: MenuDataType[] = MenuConfig

    constructor () {
        makeAutoObservable(this)
    }

    setSideMenus (value: MenuDataType[]) {
       this.sideMenus = value
    }

}