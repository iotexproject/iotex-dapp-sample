import { css } from "./";

css.global({
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "sans-serif",
    backgroundColor: "black",
  },
});

export const cssUtils = {
  page: css({
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
};
