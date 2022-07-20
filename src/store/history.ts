import _ from 'lodash';
import { makeAutoObservable } from 'mobx';
import { StorageState } from './standard/StorageState';
import RootStore from './root';
import { eventBus } from '@/lib/event';
import { TransactionReceipt } from '@ethersproject/providers';

export interface ITransactionHistoryItem {
  text: string;
  hash: string;
  amount: string;
  explorerURL: string;
  status?: number;
  isRead?: boolean;
}

export type TransactionResultStatus = 'loading' | 'success' | 'fail';
export type TransactionModule = 'Farm' | 'veFarm' | 'Swap' | 'PICO Launch' | 'DAO' | 'Faucet';
export type TransctionCoin = {
  name?: string;
  address?: string;
  logo?: string;
  decimals?: number;
};

export interface TransactionItem {
  uuid: string;
  chainId: number;
  timestamp: number; //s
  from: string;
  to: string;
  amount: string;
  coin?: TransctionCoin;

  module: TransactionModule;
  title: string; //like 'Withdraw LP Token' 'Deposit LP Token' 'Claim mimo'

  isRead: boolean;
  hash: string;

  status: TransactionResultStatus;
}

export class TransactionHistoryStore {
  transactionHistory = new StorageState<TransactionItem[]>({ key: 'Global.TransactionHistory', default: [] });
  // curTransactionResult: TransactionItem;
  rootStore: RootStore;
  isOpen: boolean = false;
  isTransactionDialogOpen: boolean = false;
  curTransactionHistoryItem: TransactionItem;
  filterParams = {
    module: 'Farm',
    to: '',
    from: '',
    chainId: 0
  };
  // moduleList = ['Farm', 'veFarm', 'Swap', 'PICO Launch', 'DAO'];
  moduleList = ['Swap'];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.initEvent();
    this.filterParams.module = this.moduleList[0];
    makeAutoObservable(this);
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  toggleTransactionDialog() {
    this.isTransactionDialogOpen = !this.isTransactionDialogOpen;
  }

  get unreadCount() {
    return this.history.filter((item) => !item.isRead).length;
  }

  get god() {
    return this.rootStore.god;
  }

  get history() {
    let transactionHistory = this.transactionHistory.value
      .slice()
      .reverse()
      .filter((item: TransactionItem) => {
        if (!this.filterParams.module) return true;
        return this.filterParams.module.toLowerCase() == item?.module?.toLowerCase();
      })
      .filter((item: TransactionItem) => {
        if (!this.filterParams.from) return true;
        return this.filterParams.from.toLowerCase() == item?.from?.toLowerCase();
      })
      .filter((item: TransactionItem) => {
        if (!this.filterParams.to) return true;
        return this.filterParams.to.toLowerCase() == item?.to?.toLowerCase();
      })
      .filter((item: TransactionItem) => {
        if (!this.rootStore.god.currentChain.chainId) return true;
        return this.rootStore.god.currentChain.chainId == item?.chainId;
      });
    return transactionHistory;
  }

  get lastestHistory() {
    return _.orderBy(this.history, ['timestamp'], ['desc']);
  }

  setValue(value: Partial<TransactionHistoryStore>) {
    Object.assign(this, value);
  }

  setFilterMoudle(module: string) {
    this.filterParams.module = module;
  }

  setFilterFrom(from: string) {
    this.filterParams.from = from;
  }

  setFilterTo(to: string) {
    this.filterParams.to = to;
  }

  setCurrentPage(page: number) {
    this.pagenation.currentPage = page;
  }

  setPageSize(size: number) {
    this.pagenation.pageSize = size;
  }

  insertHistoryFromParma({ uuid, chainId, amount, module, title }: { uuid: string; chainId: number; amount: string; module: TransactionModule; title: string }) {
    this.insertHistory({
      chainId,
      amount,
      module,
      title,
      uuid,
      timestamp: Date.now(),
      from: null,
      to: null,
      isRead: false,
      hash: null,
      status: 'loading'
    });
  }

  updateHistoryFromParma({ receipt, uuid, showDialog }: { receipt: TransactionReceipt; uuid: string; showDialog: () => TransctionCoin }) {
    let transctionItem: any = {
      uuid,
      timestamp: Date.now(),
      from: receipt.from,
      to: receipt.to,
      hash: receipt.transactionHash,
      status: 'success'
    };

    if (showDialog) {
      const coin = showDialog();
      transctionItem = {
        ...transctionItem,
        ...coin
      };
    }

    this.updateHistory(transctionItem);
  }

  insertHistory(transactionItem: TransactionItem) {
    this.transactionHistory.value.push(transactionItem);
    this.transactionHistory.save(this.transactionHistory.value);
    this.curTransactionHistoryItem = transactionItem;
    if (this.transactionHistory.value.hasOwnProperty('coin')) {
      this.isTransactionDialogOpen = true;
    }
  }

  updateHistory(transactionItem: TransactionItem) {
    const index = this.transactionHistory.value.findIndex((item) => item.uuid === transactionItem.uuid);
    this.transactionHistory.value[index] = Object.assign(this.transactionHistory.value[index], transactionItem);
    this.transactionHistory.save(this.transactionHistory.value);
    this.curTransactionHistoryItem = this.transactionHistory.value[index];
  }

  clearHitoryRead() {
    this.transactionHistory.value.forEach((item) => {
      item.isRead = true;
    });
    this.transactionHistory.save(this.transactionHistory.value);
  }

  deleteHistory(transactionItem: Pick<TransactionItem, 'uuid'>) {
    const index = this.transactionHistory.value.findIndex((item) => item.uuid === transactionItem.uuid);
    this.transactionHistory.value.splice(index, 1);
    this.transactionHistory.save(this.transactionHistory.value);
  }

  initEvent() {
    eventBus.on('history.insert', (transactionItem: TransactionItem) => {
      this.insertHistory(transactionItem);
    });

    eventBus.on('history.update', (transactionItem: TransactionItem) => {
      this.updateHistory(transactionItem);
    });

    eventBus.on('history.delete', (transactionItem: Pick<TransactionItem, 'uuid'>) => {
      this.deleteHistory(transactionItem);
    });
  }
}
