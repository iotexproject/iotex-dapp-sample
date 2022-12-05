import { makeAutoObservable } from 'mobx';
import RootStore from '@/store/root';
import { rootStore } from './index';
import { createTransport, IoTeXApp, LedgerPlugin } from '@/lib/ledger';
import { Iotx } from 'iotex-antenna/lib/iotx';
import { ExecutionMethod } from 'iotex-antenna/lib/action/method';
import { PromiseState } from './standard/PromiseState';
import { from } from '@iotexproject/iotex-address-ts';
import { TransactionRequest } from '@ethersproject/providers';
import { Deferrable } from 'ethers/lib/utils';

export class Ledger {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  _ledger: { iotx: Iotx; [key: string]: any } = null;
  async initLedger() {
    if (!this._ledger) {
      const transport = await createTransport();
      const app = new IoTeXApp(transport);
      const plugin = new LedgerPlugin(app);
      await plugin.init();
      const addresses = await plugin.getAccounts();
      const address = addresses[0].address;

      const iotx = new Iotx('https://api.mainnet.iotex.one:443', 1, {
        signer: plugin
      });
      await iotx.getAccount({ address });

      this._ledger = {
        transport,
        app,
        plugin,
        iotx,
        address
      };
    }
    return this._ledger;
  }

  ledger = new PromiseState({
    function: async () => {
      const { plugin, iotx, address } = await this.initLedger();

      this.rootStore.god.setChainId(4689);

      this.rootStore.god.currentNetwork.set({
        account: from(address).stringEth(),
        //@ts-ignore
        signer: {
          //@ts-ignore
          async sendTransaction(tx: TransactionRequest) {
            // console.log({
            //   contract: from(tx.to).string(),
            //   amount: tx.value.toString(),
            //   data: Buffer.from(tx.data as string, 'hex'),
            //   gasPrice: '1000000000000',
            //   gasLimit: '1000000'
            // });
            // return;
            const method = new ExecutionMethod(
              iotx,
              //@ts-ignore
              { address },
              {
                contract: from(tx.to).string(),
                amount: tx.value.toString(),
                data: Buffer.from(tx.data as string, 'hex'),
                gasPrice: '1000000000000',
                gasLimit: '1000000'
              },
              {
                signer: plugin
              }
            );

            const actionHash = await method.execute();
            return {
              hash: actionHash,
              async wait() {
                // @ts-ignore
                await new Promise((res) => setTimeout(res, 10000));
                const res = await iotx.getReceiptByAction({ actionHash });
                return { status: res.receiptInfo.receipt.status };
              }
            };
          }
        }
      });
      this.rootStore.god.currentNetwork.loadBalance();
      this.rootStore.god.setShowConnecter(false);
      return true;
    }
  });
}
