import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { useStore } from "../common/store/index";
import { MainLayout } from "./components/MainLayout/index";
import { rpcClient } from "./utils/rpc";
import { hooks } from "./utils/hooks";

const App = () => {
  const { lang, wallet } = useStore();
  useEffect(() => {
    lang.init();
    wallet.init();
    rpcClient.login("test", "123").then(async () => {
      const me = await rpcClient.me();
      console.log("login success", me);
      await rpcClient.logout();
      const logoutMe = await rpcClient.me();
      console.log("logout success", logoutMe);
    });
    hooks.waitAccount().then(() => {
      console.log("load account success", wallet.account.address);
    });
    hooks.waitIotxBalance().then(() => {
      console.log("load iotx balance success", wallet.account.balance);
    });
  }, []);
  return (
    <MainLayout>
      <Switch>
        <Route exact={true} path="/" component={Home} />
      </Switch>
    </MainLayout>
  );
};

export default App;
