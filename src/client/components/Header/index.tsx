import React from "react";
import { useStore } from "../../../common/store";
import { Button } from "antd";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { utils } from "../../../common/utils/index";
import { css } from "../../modules/stitches";

export const Header = () => {
  const { lang, wallet } = useStore();

  const store = useLocalStore(() => ({
    onMore() {},
    onSettings() {},
    onConnectWallet() {
      wallet.connectWallet();
    },
  }));
  return useObserver(() => (
    <div className={styles.header}>
      <div className={styles.content}>
        <img alt="logo" className={styles.logo} src={"/image/logo.png"} />
        <div className={styles.contentRight}>
          {wallet.account.address ? (
            <>
              <span>{parseFloat(wallet.account.balance).toFixed(2)} IOTX</span>&nbsp;
              <div className="cursor-pointer">{utils.helper.string.truncate(wallet.account.address, 12)}</div>
              &nbsp;&nbsp;
              <img src="/image/iotx.png" className="w-8" />
            </>
          ) : (
            <button className={styles.contentRightConnect} onClick={store.onConnectWallet}>
              {lang.t("header.connect_to_wallet")}
            </button>
          )}
          <div className="ml-2"></div>
          <Button
            className="component__header__content__right__icon_button"
            onClick={store.onMore}
            type="text"
            shape="circle"
            icon={<img src="/image/icon_more.png" className="outline-none cursor-pointer w-8" />}
          />
        </div>
      </div>
    </div>
  ));
};

const styles = {
  header: css({
    backgroundColor: "$bg",
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 999,
    height: "2.5rem",
    sm: {
      height: "2.5rem",
    },
    md: {
      height: "3rem",
    },
    lg: {
      height: "4rem",
    },
  }),
  content: css({
    flexBetweenCenter: "row",
    margin: "0 auto",
    width: "90%",
    height: "100%",
    py: "0.5rem",
    sm: {
      py: "0.5rem",
    },
    md: {
      py: "0.75rem",
    },
    lg: {
      py: "0.75rem",
    },
  }),
  contentRight: css({
    flexBetweenCenter: "row",
    fontSize: "$lg",
    color: "$gray500",
  }),
  contentRightConnect: css({
    outline: "none !important",
  }),
  contentRightButton: css({
    padding: 0,
    flexBetweenCenter: "row",
  }),
  logo: css({
    height: "100%",
  }),
};
