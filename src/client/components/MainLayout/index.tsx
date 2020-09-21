import React from "react";
import { Header } from "../../components/Header";
import { ClientOnly } from "../../components/ClientOnly/clientOnly";
import { css } from "../../modules/stitches";

interface IComponentProps {
  children: Array<JSX.Element> | JSX.Element;
}

const styles = {
  main: css({
    height: "100vh",
  }),
  content: css({
    height: "100%",
    backgroundColor: "$bg2",
  }),
};

export const MainLayout = (props: IComponentProps) => {
  return (
    <ClientOnly>
      <div className={styles.main}>
        <Header />
        <div className={styles.content}>{props.children}</div>
      </div>
    </ClientOnly>
  );
};
