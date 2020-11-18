import { renderApp } from "./server/modules/ssr/ssr.filter";

export const render = (req, res) => {
  const { html } = renderApp({ req, res });
  res.json({ html });
};
export const routes = () => {
  return ["/"];
};
