import { observable, action, computed } from "mobx";
import remotedev from "mobx-remotedev";
import { AntennaUtils } from "../utils/antanna";
import { utils } from "../utils/index";
import { fromRau, toRau } from "iotex-antenna/lib/account/utils";
import { CLAIM_ABI } from "../constants/abi";
import { Contract } from "iotex-antenna/lib/contract/contract";
import BigNumber from "bignumber.js";
import { eventBus } from "../utils/eventBus";
import { rootStore } from "./index";
import { Modal } from "antd";

@remotedev({ name: "wallet" })
export class WalletStore {
  @observable account = {
    address: "",
    balance: "",
  };
  @observable actionHash = "";

  @observable
  private isConnectWsError = false;

  @action.bound
  async init() {
    this.initEvent();
    await this.initWS();
  }
  @action.bound
  connectWallet() {
    this.initWS();
    if (!this.account.address || this.isConnectWsError) {
      const title = rootStore.lang.t(utils.env.isIoPayMobile() ? "tips.connect_fail.mobile" : "tips.connect_fail");
      const modal = Modal.warning({
        onOk: () => modal.destroy(),
        title,
      });
      setTimeout(() => {
        modal.destroy();
      }, 5000);
    }
  }

  initEvent() {
    utils.eventBus
      .on("client.iopay.connected", () => {
        console.log("iopay-desktop connected.");
        this.isConnectWsError = false;
      })
      .on("client.iopay.close", () => {
        this.account = { address: "", balance: "" };
      })
      .on("client.iopay.connectError", () => {
        this.account = { address: "", balance: "" };
        this.isConnectWsError = true;
      });
  }

  @action.bound
  async initWS() {
    const [err, address] = await utils.helper.promise.runAsync(AntennaUtils.getIoPayAddress());
    if (err || !address) {
      return setTimeout(() => {
        this.initWS();
      }, 2000);
    }

    this.account.address = address;
    this.loadAccount();
    setTimeout(() => {
      eventBus.emit("client.wallet.onAccount");
    }, 500);
  }

  @action.bound
  async loadAccount() {
    if (!this.account.address) return;
    const data = await AntennaUtils.getAntenna().iotx.getAccount({ address: this.account.address });
    if (data?.accountMeta) {
      const { balance } = data?.accountMeta;
      this.account.balance = fromRau(balance, "iotx");
      eventBus.emit("client.wallet.iotx.onBalance");
    }
  }

  @action.bound
  async claimVita() {
    try {
      const contract = new Contract(CLAIM_ABI, "io1hp6y4eqr90j7tmul4w2wa8pm7wx462hq0mg4tw", {
        provider: AntennaUtils.antenna.iotx,
        signer: AntennaUtils.antenna.iotx.signer,
      });
      const actionData = await contract.methods.claim({
        // @ts-ignore
        account: AntennaUtils.antenna.iotx.accounts[0],
        ...AntennaUtils.defaultContractOptions,
      });

      this.actionHash = actionData.actionHash;
    } catch (e) {
      window.console.log(`failed to claim vita: ${e}`);
    }
  }

  @action.bound
  async transferVita() {
    try {
      const contract = new Contract(CLAIM_ABI, "io1hp6y4eqr90j7tmul4w2wa8pm7wx462hq0mg4tw", {
        provider: AntennaUtils.antenna.iotx,
        signer: AntennaUtils.antenna.iotx.signer,
      });

      const decimals = await contract.methods.decimals({
        // @ts-ignore
        account: AntennaUtils.antenna.iotx.accounts[0],
        ...AntennaUtils.defaultContractOptions,
      });

      const tokenAmount = new BigNumber(1).multipliedBy(new BigNumber(`1e${decimals.toNumber()}`));

      const actionData = await contract.methods.transfer(this.account.address, tokenAmount.toString(), {
        // @ts-ignore
        account: AntennaUtils.antenna.iotx.accounts[0],
        ...AntennaUtils.defaultContractOptions,
      });

      this.actionHash = actionData.actionHash;
    } catch (e) {
      window.console.log(`failed to transfer vita: ${e}`);
    }
  }

  @action.bound
  async transferIotx() {
    try {
      const actionData = await AntennaUtils.antenna.iotx.sendTransfer({
        to: this.account.address,
        from: this.account.address,
        value: toRau("1", "Iotx"),
        gasLimit: "100000",
        gasPrice: toRau("1", "Qev"),
      });
      // @ts-ignore
      this.actionHash = actionData.actionHash;
    } catch (e) {
      window.console.log(`failed to transfer iotx: ${e}`);
    }
  }
}
