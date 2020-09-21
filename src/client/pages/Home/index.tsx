import React, { useEffect } from "react";
import { useObserver, useLocalStore } from "mobx-react-lite";
import { useStore } from "../../../common/store/index";
import { Button } from "antd";
import { publicConfig } from "../../../../configs/public";
import { css } from "../../modules/stitches";

export const Home = () => {
  const { wallet } = useStore();
  const store = useLocalStore(() => ({
    onConnectWallet() {
      wallet.connectWallet();
    },
  }));
  return useObserver(() => (
    <div className={styles.home}>
      {!wallet.account.address ? (
        <button onClick={store.onConnectWallet}>Connect to wallet...</button>
      ) : (
        <div>
          <Button className="px-2 mx-2" onClick={() => wallet.claimVita()}>
            Claim VITA
          </Button>
          <Button className="px-2 mx-2" onClick={() => wallet.transferVita()}>
            Transfer 1 VITA
          </Button>
          <Button className="px-2 mx-2" onClick={() => wallet.transferIotx()}>
            Transfer 1 IOTX
          </Button>
          {wallet.actionHash && (
            <p>
              Action Hash: <a href={`${publicConfig.IOTEXSCAN_ENDPOINT}/action/${wallet.actionHash}`}>{wallet.actionHash}</a>
            </p>
          )}
        </div>
      )}
    </div>
  ));
};

const styles = {
  home: css({
    textAlign: "center",
    pt: "5rem",
    margin: "0 auto",
    width: "100%",
  }),
};
